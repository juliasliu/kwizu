class QuizzesController < ApplicationController
  before_action :set_quiz, only: [:show, :edit, :update, :destroy]

  # GET /quizzes
  # GET /quizzes.json
  def index
    @user = current_user
    # get the featured 5
    featured = Quiz.where(featured: true).where(public: true).sort_by{|e| -e.taken_users.length}.first(5)
   
    # get top 10 most recommended using collaborative
    friends = @user.friends
    friends_quizzes = []
    friends.each do |friend|
      friends_quizzes.push(*friend.taken_quizzes)
    end
    recommended = friends_quizzes.sort_by{|e| -e.taken_users.length}.uniq.first(10)
    if recommended.length == 0
      recommended = Quiz.where(public: true).sort_by{|e| -e.taken_users.length}.first(10)
    end
    
    # get top 10 most popular
    popular = Quiz.where(public: true).sort_by{|e| -e.taken_users.length}.first(10)
    
    if featured and recommended and popular
      render json: { 
        featured: featured.map { |q|
        q.as_json(methods: :image_url)
        },
        recommended: recommended.map { |q|
        q.as_json(methods: :image_url)
        },
        popular: popular.map { |q|
        q.as_json(methods: :image_url)
        },
      }
    end
  end
  
  # GET /quizzes/search/keyword
  def search
    if params[:keyword]
      @quizzes = Quiz.where(public: true).where('title ILIKE ?', "%#{params[:keyword]}%").sort_by{|e| -e.taken_users.length}
    end
    if @quizzes
      render json: { 
        quizzes: @quizzes.map { |q|
        q.as_json(methods: :image_url)
        }
      }
    end
  end

  # GET /quizzes/1
  # GET /quizzes/1.json
  def show
    @user = current_user
    @quiz = Quiz.find(params[:id])

    if @quiz
      # check if user took the test already
      @quizzing = Quizzing.find_by(user_id: @user.id, quiz_id: @quiz.id)
      render json: {
        quiz: @quiz.as_json(include: [ :user, { results: { methods: :image_url } }, { questions: { include: { choices: { methods: :image_url } } } } ], methods: :image_url),
        quizzing: @quizzing.as_json(include: :choices)
      }
    else
      render json: {
        status: 500,
        errors: ['quiz not found']
      }
    end
  end
  
  # GET /quizzings/1/2
  def quizzing
    @quiz = Quiz.find(params[:quiz_id])
    @quizzing = Quizzing.find_by(user_id: params[:user_id], quiz_id: params[:quiz_id])

    if @quizzing and @quiz
      render json: {
        quiz: @quiz.as_json(include: [ :user, { results: { methods: :image_url } }, { questions: { include: { choices: { methods: :image_url } } } } ], methods: :image_url),
        quizzing: @quizzing.as_json(include: :choices)
      }
    else
      render json: {
        status: 500,
        errors: ['quiz not found']
      }
    end
  end

  # GET /quizzes/1/leader
  def leader
    @quiz = Quiz.find(params[:id])
    @quizzings = Quizzing.where(quiz_id: params[:id])

    if @quizzings
      users = []
      @quizzings.each do |quizzing|
        users << quizzing.user
      end

      render json: {
        quiz: @quiz.as_json(include: :results),
        quizzings: @quizzings,
        users: users.map { |q|
        q.as_json(include: [{ friends: { methods: :avatar_url } }, 
        { friends_requested: { methods: :avatar_url } }, 
        { friends_received: { methods: :avatar_url } } ], methods: :avatar_url)
        }
      }
    else
      render json: {
        status: 500,
        errors: ['quiz results not found']
      }
    end
  end
  
  # GET /quizzes/1/recommend
  def recommend
    @user = current_user
    # get top 5 predictive
    predictive = Quiz.where.not(id: params[:id]).where(public: true).sort_by{|e| -e.taken_users.length}.first(5)
    
    # get top 5 collaborative
    friends = @user.friends
    friends_quizzes = []
    friends.each do |friend|
      friends_quizzes.push(*friend.taken_quizzes.where.not(id: params[:id]))
    end
    collaborative = friends_quizzes.sort_by{|e| -e.taken_users.length}.uniq.first(5)
    
    # combine and take top 5 unique
    quizzes = []
    quizzes.push(*predictive).push(*collaborative)
    quizzes = quizzes.uniq.first(5)
    
    if quizzes
      render json: { 
        quizzes: quizzes.map { |q|
        q.as_json(methods: :image_url)
        },
      }
    else
      render json: {
        status: 500,
        errors: ['no quizzes found']
      }
    end
  end
  
  # GET /quizzes/new
  def new
    @quiz = Quiz.new
  end

  # GET /quizzes/1/edit
  def edit
  end

  # POST /quizzes
  # POST /quizzes.json
  def create
    validation_errors = validate_quiz
    unless validation_errors.nil?
      p validation_errors
      render json: {
        status: 500,
        errors: validation_errors
      } and return
    end
    
    @user = current_user
    @quiz = @user.quizzes.build(quiz_params)
    unless params[:quiz][:image].nil?
      @quiz.image.attach(io: image_io(params[:quiz][:image]), filename: file_name(params[:quiz][:image]))
    end
    if @quiz.save
      params[:quiz][:questions].each do |question|
        @question = @quiz.questions.build(question_params(question))
        if @question.save
          question[:choices].each do |choice|
            @choice = @question.choices.build(choice_params(choice))
            if @choice.save

            else
              # failed to create choice
              render json: {
                status: 500,
                errors: @choice.errors.full_messages
              } and return
            end
          end
        else
          # failed to create question
          render json: {
            status: 500,
            errors: @question.errors.full_messages
          } and return
        end
      end

      params[:quiz][:results].each do |result|
        @result = @quiz.results.build(result_params(result))
        unless result[:image].nil?
          @result.image.attach(io: image_io(result[:image]), filename: file_name(result[:image]))
        end
        if @result.save

        else
          # failed to create result
          render json: {
            status: 500,
            errors: @result.errors.full_messages
          } and return
        end
      end
      
      render json: {
        status: :created,
        quiz: @quiz.as_json(include: [ :user, { results: { methods: :image_url } }, { questions: { include: { choices: { methods: :image_url } } } } ], methods: :image_url)
      }
    else 
      # failed to create quiz
      render json: {
        status: 500,
        errors: @quiz.errors.full_messages
      }
    end
  end

  # POST /quizzes/save
  def save
    @user = current_user
    @quiz = Quiz.find_by(id: quizzing_params[:quiz_id])

    @quizzing = Quizzing.find_by(user_id: @user.id, quiz_id: @quiz.id)
    if @quizzing.nil?
      @quizzing = @user.quizzings.build(quizzing_params)
      # add result and choices for quizzing
      @quizzing.result = Result.find_by(id: params[:result_id])
      params[:choice_ids].each do |choice_id|
        @quizzing.choices << Choice.find_by(id: choice_id)
      end

      if @quizzing.save
        if @quiz.user.notification_token
          send_notification({
            "token" => @quiz.user.notification_token, 
            "title" => "A user took your kwiz!", 
            "body" => @quiz.title
          })
        end
        
        @user.friends.each do |friend|
          if friend.notification_token
            send_notification({
              "token" => friend.notification_token, 
              "title" => "Your friend just took a kwiz!", 
              "body" => @quiz.title
            })
          end
        end

        render json: {
          status: :saved,
          quiz: @quiz.as_json(include: [ :user, { results: { methods: :image_url } }, { questions: { include: { choices: { methods: :image_url } } } } ], methods: :image_url),
          quizzing: @quizzing,
          newQuiz: true,
        }
      else
        render json: {
          status: 500,
          errors: @quizzing.errors.full_messages
        }
      end
    else
      # update result and choices for quizzing
      @quizzing.result = Result.find_by(id: params[:result_id])
      # delete all choices from array
      @quizzing.choices.each do |choice|
        @quizzing.choices.delete(Choice.find_by(id: choice.id))
      end
      params[:choice_ids].each do |choice_id|
        # add choice
        @quizzing.choices << Choice.find_by(id: choice_id)
      end

      if @quizzing.update(quizzing_params)
        render json: {
          status: :saved,
          quizzing: @quizzing,
          newQuiz: false,
        }
      else
        render json: {
          status: 500,
          errors: @quizzing.errors.full_messages
        }
      end
    end
  end
  
  # PATCH/PUT /quizzes/1
  # PATCH/PUT /quizzes/1.json
  def update
    validation_errors = validate_quiz
    unless validation_errors.nil?
      p validation_errors
      render json: {
        status: 500,
        errors: validation_errors
      } and return
    end
    
    # if you update the quiz by adding more results/choices or questions or deleting them, destroy all quizzings
    @user = current_user
    @quiz = Quiz.find_by(id: params[:id])

    unless params[:quiz][:image].nil?
      # add/update image if applies
      @quiz.image.attach(io: image_io(params[:quiz][:image]), filename: file_name(params[:quiz][:image]))
    else
      if params[:quiz][:image_url].nil?
        # delete image if deleted 
        @quiz.image.purge
      end
    end

    if @quiz.update(quiz_params)
      # remove all questions that are not in this updated quiz
      @quiz.questions.each do |question|
        unless params[:quiz][:questions].any? {|r| r[:id] == question.id }
          # destroy all the choices in this question
          question.choices.destroy_all
          # destroy the question
          question.destroy
        end
      end
      # update or add questions
      params[:quiz][:questions].each do |question|
        unless Question.find_by(id: question[:id]).nil?
          # update existing question
          @question = Question.find_by(id: question[:id])
          if @question.update(question_params(question))
            # remove all choices that are not in this updated question
            @question.choices.each do |choice|
              unless question[:choices].any? {|r| r[:id] == choice.id }
                # destroy the choice
                choice.destroy
              end
            end
            # update or add choices
            question[:choices].each do |choice|
              unless Choice.find_by(id: choice[:id]).nil?
                # update existing choice
                @choice = Choice.find_by(id: choice[:id])
                if @choice.update(choice_params(choice))

                else
                  # failed to update choice
                  render json: {
                    status: 500,
                    errors: @choice.errors.full_messages
                  } and return
                end
              else
                # create new choice
                @choice = @question.choices.build(choice_params(choice))
                if @choice.save

                else
                  # failed to create choice
                  render json: {
                    status: 500,
                    errors: @choice.errors.full_messages
                  } and return
                end
              end
            end
          else
            # failed to update question
            render json: {
              status: 500,
              errors: @question.errors.full_messages
            } and return
          end
        else
          # create new question
          @question = @quiz.questions.build(question_params(question))
          if @question.save
            question[:choices].each do |choice|
              # create new choice
              @choice = @question.choices.build(choice_params(choice))
              if @choice.save

              else
                # failed to create choice
                render json: {
                  status: 500,
                  errors: @choice.errors.full_messages
                } and return
              end
            end
          else
            # failed to create question
            render json: {
              status: 500,
              errors: @question.errors.full_messages
            } and return
          end
        end
      end
      
      # remove all results that are not in this updated quiz
      @quiz.results.each do |result|
        unless params[:quiz][:results].any? {|r| r[:id] == result.id }
          # destroy the result
          @quizzing = Quizzing.find_by(result_id: result.id)
          unless @quizzing.nil?
            @quizzing.destroy
          end
          result.destroy
        end
      end
      # update or add results
      params[:quiz][:results].each do |result|
        unless Result.find_by(id: result[:id]).nil?
          # update existing result
          @result = Result.find_by(id: result[:id])
          unless result[:image].nil?
            # add/update image if applies
            @result.image.attach(io: image_io(result[:image]), filename: file_name(result[:image]))
          else
            if result[:image_url].nil?
              # delete image if deleted 
              @result.image.purge
            end
          end

          if @result.update(result_params(result))

          else
            # failed to update result
            render json: {
              status: 500,
              errors: @result.errors.full_messages
            } and return
          end
        else
          # create new result
          @result = @quiz.results.build(result_params(result))
          unless result[:image].nil?
            # add image if applies
            @result.image.attach(io: image_io(result[:image]), filename: file_name(result[:image]))
          end
          if @result.save

          else
            # failed to create result
            render json: {
              status: 500,
              errors: @result.errors.full_messages
            } and return
          end
        end
      end

      render json: {
        status: :updated,
        quiz: @quiz
      }
    else 
      # failed to update quiz
      render json: {
        status: 500,
        errors: @quiz.errors.full_messages
      }
    end
  end

  # DELETE /quizzes/1
  # DELETE /quizzes/1.json
  def destroy
    @quiz = Quiz.find_by(id: params[:id])
    @quiz.questions.each do |question|
      @question = Question.find_by(id: question.id)
      @question.choices.destroy_all
    end
    @quiz.questions.destroy_all
    @quiz.quizzings.destroy_all
    @quiz.results.destroy_all

    if @quiz.destroy
      render json: {
        status: :deleted
      }
    else
      render json: {
        status: 500,
        errors: @quiz.errors.full_messages
      }
    end
  end

  private
  # Use callbacks to share common setup or constraints between actions.
  def set_quiz
    @quiz = Quiz.find(params[:id])
  end
    
  # Validate quiz, questions, choices, and results
  def validate_quiz
    @user = current_user
    @quiz = @user.quizzes.build(quiz_params)
    unless params[:quiz][:image].nil?
      @quiz.image.attach(io: image_io(params[:quiz][:image]), filename: file_name(params[:quiz][:image]))
    end
    if @quiz.valid?
      resultWeights = (1..params[:quiz][:results].length()).to_a
      params[:quiz][:questions].each do |question|
        resultWeightsClone = resultWeights.clone
        @question = Question.new(question_params(question))
        @question.quiz = @quiz
        if @question.valid?
          question[:choices].each do |choice|
            @choice = Choice.new(choice_params(choice))
            @choice.question = @question
            unless @choice.valid?
              # failed to create choice
              return @choice.errors.full_messages
            end
            # if resultWeightsClone array is empty, more choices than results
            if resultWeightsClone.empty?
              return ["Each choice in question #{(question[:index]+1)} must be assigned to a unique result"]
            end
            # if the weight exists in resultWeightsClone
            if resultWeightsClone.include?(choice[:weight])
              # remove the choice result index from resultWeightsClone
              resultWeightsClone.delete(choice[:weight])
            else
              return ["Each choice in question #{(question[:index]+1)} must be assigned to a unique result"]
            end
          end
          # if resultWeightsClone array is not empty, more results than choices
          unless resultWeightsClone.empty?
            return ["You must assign each result to a choice in question #{(question[:index]+1)}"]
          end
        else
          # failed to create question
          return @question.errors.full_messages
        end
      end

      params[:quiz][:results].each do |result|
        @result = Result.new(result_params(result))
        @result.quiz = @quiz
        unless result[:image].nil?
          @result.image.attach(io: image_io(result[:image]), filename: file_name(result[:image]))
        end
        unless @result.valid?
          # failed to create result
          return @result.errors.full_messages
        end
      end
    else
      # failed to create quiz
      return @quiz.errors.full_messages
    end
    return nil
  end
  
  # Only allow a list of trusted parameters through.
  def quiz_params
    params.require(:quiz).permit(:title, :public, :user_id)
  end
    
  # Only allow a list of trusted parameters through.
  def result_params(result)
    result.permit(:title, :description, :weight, :quiz_id)
  end
      
  # Only allow a list of trusted parameters through.
  def question_params(question)
    question.permit(:title, :quiz_id)
  end
        
  # Only allow a list of trusted parameters through.
  def choice_params(choice)
    choice.permit(:content, :weight, :question_id)
  end
          
  # Only allow a list of trusted parameters through.
  def quizzing_params
    params.require(:quizzing).permit(:user_id, :quiz_id)
  end
      
  def image_io(image)
    decoded_image = Base64.decode64(image[:data])
    StringIO.new(decoded_image)
  end
    
  def file_name(image)
    image[:fileName]
  end
end
