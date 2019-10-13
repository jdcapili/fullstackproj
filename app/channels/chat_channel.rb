class ChatChannel < ApplicationCable::Channel
  def subscribed
    
    @chat_channel = Channel.find(params[:id])
    # stream_from "some_channel"
    stream_for @chat_channel
  end

  def speak(data)
     
    message = Message.new(body: data['message'])
    message.messageable_type = 'Channel'
    message.messageable_id = data['channel_id'] 
    author = User.find(data['author_id']) # I might need the currentUserId
    message.author = author
    if message.save
      author = {author: {author_id: author.id, author_name: author.display_name}}
      datum = message.attributes.merge(author)
      socket = {message: datum,type: 'message'}
      ChatChannel.broadcast_to(@chat_channel, socket)
    end
  end

  def update(data)

    message = Message.includes(:author).find(data['message']['id'])
    author = message.author
    if message.update({body: data['message']['body']})
      author = {author: {author_id: author.id, author_name: author.display_name}}
      datum = message.attributes.merge(author)
      socket = {message: datum,type: 'message'}
      ChatChannel.broadcast_to(@chat_channel, socket)
    end
  end

  def load
    
    messages = Message.all.collect(&:body)
    socket = { messages: messages, type: 'messages' }
    ChatChannel.broadcast_to(@chat_channel, socket)
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
