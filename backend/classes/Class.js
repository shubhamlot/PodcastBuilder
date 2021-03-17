
class User{
    constructor(){
        this.id = Math.random()
    }

    createUser(username,email,password){
        this.username = username
        this.email = email
        this.password = password
    }
    login(Vali_email,Vali_password){
        if(this.password === Vali_password &&
           this.email ===Vali_email){
               return true
           }
           return false;
    }
}


class AuthData{
    
}


class Channel{
    constructor(){
        this.id = Math.random()
    }

    createChannel(channelName,contentType,country,discription,RssLink,cover_img,user){
        this.channelName = channelName
        this.contentType = contentType
        this.country = country
        this.discription = discription
        this.RssLink = RssLink
        this.cover_img = cover_img
        this.author = user
    }
}



class Episode{
    constructor(){
        this.id = Math.random()
    }

    createEpisode(channelid,Title,discription,cover_img,category,language,audiofile){
        this.channelid = channelid
        this.Title = Title
        this.discription = discription
        this.cover_img = cover_img
        this.category = category
        this.language = language
        this.audiofile = audiofile
    }

    upDateEpisodes(){}
}

class Room{
    constructor(){
        this.id = Math.random()
    }

    createRoom(session,registrationDate,GuestList=[]){
        this.session = session
        this.registrationDate = new Date().toString()
        this.GuestList = GuestList
    }

    genratePassKey(){

        let PassKey = Math.random()
        return PassKey
    }
}


class Guest {
    constructor(){
        this.id = Math.random() 
    }

    createGuest(guestname,guesttoken,guesttokenExpiration){
        this.guestname = guestname
        this.guesttoken = guesttoken
        this.guesttokenExpiration = guesttokenExpiration
    }

    joinRoom(roomId){

    }

}


class AudioFiles{
    constructor(refroomId){
        this.refroomId = refroomId
    }
    startAudiofile(){

    }
}
