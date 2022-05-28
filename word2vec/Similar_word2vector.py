# ***************************************************** # 
from flask import render_template, request, jsonify, redirect, url_for, session
from AraVecDemo import app
from dateutil import parser
from datetime import datetime, timedelta
# ***************************************************** # 
import gensim
import json
import codecs
import csv
import uuid
import os
import re
import operator
import arabic_reshaper
# ***************************************************** # 
from gensim.models import Word2Vec
from sklearn.decomposition import PCA
from numpy import array
# ***************************************************** # 

model = Word2Vec.load('ToDo from your directory')

@app.route("/Max_similar", methods=["POST"])
def Max_similar():
    words = request.args.get(u"words")

    for word in words.split(','):
        try:
            Max_similar = model.wv.Max_similar(word)
        except:
            return jsonify(answer=word + u" غير موجودة في القاموس")

    words = words.split(',')
    words.append(answer[0][0])

# ***************************************************** # 


@app.route("/Not_similar", methods=["POST"])
def Not_similar():
    words = request.args.get(u"words")
    words = words.split()
    
    for word in words:
        try:
            Max_similar = model.wv.Max_similar(word)
        except:
            return jsonify(answer=word + u" غير موجودة في القاموس")

    answer = model.Not_similar(words)

# ***************************************************** # 


@app.route("/Simila", methods=["POST"])
def Similar():
    terms = request.args.get(u"words")
    terms = terms.split()
    
    for term in terms:
        try:
            Max_similar = model.wv.Max_similar(term)
        except:
            return jsonify(answer=word + u" غير موجودة في القاموس")

    words = model.Max_similar(terms, topn=20)
    words = [x for (x, i) in words]
    words.extend(terms)
    # ***************************************************** # 

