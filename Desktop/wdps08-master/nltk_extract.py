import spacy
from spacy import displacy
from collections import Counter
import en_core_web_sm
from pprint import pprint
from unidecode import unidecode
from pyspark.sql import SparkSession
from pyspark import SparkContext

def getdata():
		nlp = en_core_web_sm.load()

		# def remove_non_ascii(text):
			# return unidecode(unicode(text, encoding = "utf-8"))

		f=open("output\clueweb12-0000tw-00-00000","r+")

		contents=f.read()
		f.close()
		#print(contents)

		contents1=unicode(contents)

		article=nlp(contents1)
		#remove_non_ascii(article)

		# pprint([(X.text, X.label_) for X in article.ents])
		#pprint([(X) for X in article])

		sentences = [x for x in article.sents]
		print(sentences[2])

		# sentences = [x for x in article.sents]
		# print(sentences[0])
		# sen=unicode(sentences[0])
		# displacy.render(nlp(unicode(sentences[2])), jupyter=True, style='ent')

		# [(x.orth_,x.pos_, x.lemma_) for x in [y 
											  # for y
											  # in nlp(unicode(sentences[2]))
											  # if not y.is_stop and y.pos_ != 'PUNCT']]
											  
		final = dict([(str(x), x.label_) for x in article.ents])
		pprint(final)

		f1= open("Extracted.txt","w+")

		f1.write(str(final))
		f1.close()


if __name__ == "__main__":
	getdata()
	
	# spark = SparkSession.builder.appName("SparkLinker").getOrCreate()

    # lines = spark.read.text("C:/Users/Saurabh/Desktop/wdps08-master/Extracted.txt").rdd.map(lambda r: r)
    # lines.show
	# System.setProperty("hadoop.home.dir", "C:/Users/Saurabh/Desktop/wdps08-master/winutils.exe")
	# df = spark.read.option("delimiter", ",").csv("C:/Users/Saurabh/Desktop/wdps08-master/Extracted.txt",header=True)	
	print(df.collect())
	
	
	
	