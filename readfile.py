import pandas as pd
def read(fileName, category):
    data = pd.read_excel(fileName)
    questions = {k: v for k, v in zip(data[data['类型']==category]['题目'].tolist(), data[data['类型']==category]['参考答案'].tolist())}
    return questions