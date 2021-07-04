import speech_recognition as sr
import sys

filename = "D:/ProjectFolder/Podcast Builder/backend/public/audio/"+sys.argv[1]#input()

# stereo_audio = AudioSegment.from_file(filename,format="wav")

# mono_audios = stereo_audio.split_to_mono()


# mono_left = mono_audios[0].export(
#     "D:/ProjectFolder/Podcast Builder/backend/public/pythonAudio/"+file,
#     format="wav"
# )



# filename = "D:/ProjectFolder/Podcast Builder/backend/public/pythonAudio/"+file#input()
r = sr.Recognizer()

# open the file
with sr.AudioFile(filename) as source:
    # listen for the data (load audio to memory)
    audio_data = r.record(source)
    # recognize (convert from speech to text)
    text = r.recognize_google(audio_data)
    print(text)