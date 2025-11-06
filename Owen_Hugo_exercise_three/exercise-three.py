#STEP 1:
# resource for post and get
# https://stackoverflow.com/questions/29987323/how-do-i-send-data-from-js-to-python-with-flask

import json
# jsonify from hugo
from flask import Flask,render_template,request, jsonify
import os
app = Flask(__name__)
UPLOAD_FOLDER = 'static/uploads' # Or os.path.join(app.instance_path, 'uploads')
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024 # 16 MB limit

# the default route
@app.route("/")
def index():
      return render_template("index.html")

#STEP 2:
#*************************************************
#Task: CAPTURE & POST & FETCH & SAVE
@app.route("/t2")
# step2
def t2():
      # print("whatever")
      return render_template("t2.html")
app.route("/postDataFetch",methods = ['POST'])


#STEP 2.5:
@app.route("/postDataFetch",methods = ['POST'])
def postDataFetch():

      # print ("recevied")

 

      #parsing data from the request json object
      data = request.get_json()
      # print (data)
      #recieving data from fetch request
      # didnt like hue as an integer write 
      hue = f"{data.get('hue')}"
      name = data.get('name')

     
      
      # print ("color recieved:", hue)

      #file path for reading and writing from files
      file_path = os.path.join("files", "data.txt")


      # write colour and name to file
      with open(file_path, "a") as f:
          f.write(hue + ", ")
          f.write(name + "\n")

      app.logger.info(request.form)

      #returning the data
      return jsonify({"data_received":"yes", "hue":hue, "name":name})

#*************************************************




@app.route("/personal")
def personal():
      # print("whatever")
      return render_template("personal.html")
app.route("/getDataLeaderboard",methods = ['POST'])


@app.route("/getPets", methods = ['POST'])
# step2
def getPets():
      # print("whatever")
      # file read and write
      file_path = os.path.join("files", "data.txt")

            #because we want to identify if the picked color already exists in the server, we loop through the server file and count
      # create empty dict for output
      out = {}
      i = 1
      with open(file_path, "r") as f:
          for line in f:
                  
                  # partition each line
                  thing = line.partition(',')
                  hue = thing[0]
                  name = thing[2]
                  print(name)
                  # add both key value pairs to the dictionary, under itteration number to make dict easy to unpack w/ a for loop
                  out.update({f"{i}":{"hue":f"{hue}","name":f"{name}" }})
                  # "hue:{hue}, name:{name}\n"
                  i = i+1

      return jsonify(out)
app.route("/getDataLeaderboard",methods = ['POST'])



#run
app.run(debug=True)
 



