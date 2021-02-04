# Temporary variables
is_creating_quiz = false

is_creating_result = false
result_title = ""
result_weight = 0

is_creating_choice = false

# Flush the file
File.open("seeds_all.rb", "w") {|f|
  f.flush
}

# Write to file
def write_line(new_file_line)
  p new_file_line
  File.open("seeds_all.rb", "a") {|f|
    f.puts(new_file_line)
  }
end

File.open("seeds_text.txt", "r").each_line do |line|

  # determine what type of model being created
  ignore, type, index, content = line.split(/(.*?) (\d*?)\: /)
  if content
    content = content.split(/\n/)[0]
  end
  image_file_name = line.split(/\[(.*?)\]/)[1]

  # if new quiz, result, or question
  if type and index and content
    if type.eql?('Quiz')
      write_line("@quiz = Quiz.create(title: '" + content + "', user_id: 1, public: true, featured: true)")
      is_creating_quiz = true
    elsif type.eql?('Result')
      result_weight = index
      result_title = content
      is_creating_result = true
    elsif type.eql?('Question')
      write_line("@question = Question.create(title: '" + content + "', quiz_id: current_quiz_id)")
      write_line("current_question_id = @question.id")
    elsif type.eql?('Choice')
      write_line("@choice = Choice.create(content: '" + content + "', weight: " + index + ", question_id: current_question_id)")
      is_creating_choice = true
    end
  # if attach image
  elsif image_file_name
    image_file_type = image_file_name.split(/\./)[1]
    if is_creating_quiz
      write_line("@quiz.image.attach(io: File.open(Rails.root.to_s + '/app/assets/images/" + image_file_name + "'), filename: '" + image_file_name + "', content_type: 'application/" + image_file_type + "')")
      write_line("current_quiz_id = @quiz.id")
      is_creating_quiz = false
    elsif is_creating_result
      write_line("@result.image.attach(io: File.open(Rails.root.to_s + '/app/assets/images/" + image_file_name + "'), filename: '" + image_file_name + "', content_type: 'application/" + image_file_type + "')")
      is_creating_result = false
    elsif is_creating_choice
      write_line("@choice.image.attach(io: File.open(Rails.root.to_s + '/app/assets/images/" + image_file_name + "'), filename: '" + image_file_name + "', content_type: 'application/" + image_file_type + "')")
      is_creating_choice = false
    end
  # otherwise, result description
  elsif line.split(/\n/)[0] != "~"
    write_line("@result = Result.create(title: '" + result_title + "', description: '" + line.split(/\n/)[0] + "', weight: " + result_weight.to_s + ", quiz_id: current_quiz_id)")
  # else, write blank line
  else
    write_line("\n")
  end
  
end
