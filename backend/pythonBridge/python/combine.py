
# Combine the two audio

import sys, json
from pydub import AudioSegment
from pydub.playback import play
from array import array
# wav_file_1 = AudioSegment.from_file("noice.wav") 
# wav_file_2 = AudioSegment.from_file("Sample.wav")
  
# # Combine the two audio files 
# wav_file_3 = wav_file_1 + wav_file_2
   
# # play the sound 
# play(wav_file_3)





# if __name__ == '__main__':
#     my_list = json.loads(sys.argv[1])
    
#     path='D:/ProjectFolder/Podcast Builder/backend/public/audio/'
#     my_list.reverse()

#     while(length(my_list)>0):
#     	somelist = AudioSegment.from_file(path+my_list.pop())
#     	finallist += somelist

#     finallist.export(out_f = "join.wav", 
#                        format = "wav")
    

# mylist = ['hSu31PchQPBo.wav', 'jE7WGSe2E9Z2.wav', 'ixYs76QdIjza.wav']

path='D:/ProjectFolder/Podcast Builder/backend/public/audio/'

# my_list.reverse()

# while(length(my_list)>0):
# 	somelist = AudioSegment.from_file(path+my_list.pop())
# 	finallist += somelist

# finallist.export(out_f = "join.wav", 
#                        format = "wav")
import datetime

from pydub import AudioSegment

my_list = json.loads(sys.argv[1])
# print(len(my_list))
i =0
my_list.reverse()
old = AudioSegment.from_file(path+my_list.pop())
while(len(my_list)>0):
	new = AudioSegment.from_file(path+my_list.pop())
	old = old+new


basename = "combinedfile"
suffix = datetime.datetime.now().strftime("%y%m%d_%H%M%S")
filename = "_".join([basename, suffix])
print(filename+".wav")

old.export("D:/ProjectFolder/Podcast Builder/backend/public/pythonAudio/"+filename+".wav",format = "wav")
# for i in arr:
# 	print(i)


# wav_file_1 = AudioSegment.from_file(path+mylist.pop())
# wav_file_2 = AudioSegment.from_file(path+mylist.pop())

# # Combine the two audio files
# wav_file_3 = wav_file_1 + wav_file_2

# wav_file_3.export(out_f = "join.wav", 
#                        format = "wav")

