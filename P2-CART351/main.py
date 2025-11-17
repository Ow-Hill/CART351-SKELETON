import os
import json


from flask import Flask,render_template,request,jsonify



app = Flask(__name__)


@app.route("/")
def index():
    return render_template("index.html")



@app.route("/t2")
def t2():
    return render_template("t2.html")



#STEP 2.5:
@app.route("/postDataFetch",methods = ['POST'])
def postDataFetch():

    print ("recevied")
      #parsing data from the request json object

    data = request.get_json()
# Check if the file exists (can be a file or directory)
    filePath="files/dataTriangles.json"
    try:

        if os.path.exists(filePath):
            
            
            jsonFile = open(filePath, "r+")
            theList = json.load(jsonFile)

    
            jsonFile_write = open(filePath, "w")
            theList.append(data)
            json.dump(theList, jsonFile_write, indent =4)
            jsonFile_write.close()
            return({"data_received":"yes"})
        else:
            app.logger.info("file not exists")
            #open file for writing
            jsonFile = open(filePath, "w")
            json.dump([data], jsonFile, indent =4)
            jsonFile.close()
            return( jsonify({"data_received":"yes"}))
    except:
        print("unsucsesful" + EOFError)


@app.route("/archive")
def archive():
    return render_template("archive.html")
app.route("/getTri",methods = ['POST'])


@app.route("/getTri",  methods = ['POST'])
def getTri():
    print("1")
    file_path = "files/dataTriangles.json"
    print("2")
    jsonFile = open(file_path, "r+")
    print("3")
    out = json.load(jsonFile)
    print("3")
    print (out)
    return (out)
app.route("/getTri",methods = ['POST'])







#run
app.run(debug=True)










#OLD CODE TO PULL FROM 

# @app.route("/personal")
# def personal():
#       # print("whatever")
#       return render_template("personal.html")

# app.route("/getDataLeaderboard",methods = ['POST'])


# @app.route("/getPets", methods = ['POST'])
# # step2
# def getPets():
#       # print("whatever")
#       # file read and write
#       file_path = os.path.join("files", "data.txt")

#       #because we want to identify if the picked color already exists in the server, we loop through the server file and count
#       # create empty dict for output
#       out = {}
#       i = 1
#       with open(file_path, "r") as f:
#           for line in f:
                  
#                   # partition each line
#                   thing = line.partition(',')
#                   hue = thing[0]
#                   name = thing[2]
#                   print(name)
#                   # add both key value pairs to the dictionary, under itteration number to make dict easy to unpack w/ a for loop
#                   out.update({f"{i}":{"hue":f"{hue}","name":f"{name}" }})
#                   # "hue:{hue}, name:{name}\n"
#                   i = i+1

#       return jsonify(out)
# app.route("/getDataLeaderboard",methods = ['POST'])



# #run
# app.run(debug=True)
 



