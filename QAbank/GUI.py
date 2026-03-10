import tkinter as tk
import random
import readfile
from gifplayer import playGif

def exit(root):
    root.quit()

def show(info, root, size, h):
    label = tk.Label(root, text=info, font=('Helvetica',size))
    label.place(x=700, y=h, anchor='center')

def check(en, answer, root, chapter, category):
    try:
        if varA.get():
            en += 'A'
        if varB.get():
            en += 'B'
        if varC.get():
            en += 'C'
        if varD.get():
            en += 'D'
        if varE.get():
            en += 'E'
    except:
        if var_yes.get():
            en = '√'
        if var_no.get():
            en = '×'
    compare(en, answer, root, chapter, category)

def judge(root, answer, chapter, category):
    global var_yes, var_no, checkbutton_yes, checkbutton_no, en, confirm
    en = ''
    var_yes = tk.BooleanVar()
    var_no = tk.BooleanVar()
    checkbutton_yes = tk.Checkbutton(root, text='√', font=('Helvetica', 16), variable=var_yes)
    checkbutton_yes.place(x=500, y=500, anchor='center') 
    checkbutton_no = tk.Checkbutton(root, text='×', font=('Helvetica', 16), variable=var_no)
    checkbutton_no.place(x=900, y=500, anchor='center') 

    confirm = tk.Button(root, text='Really ?', font=('Helvetica', 16), command=lambda: check(en, answer, root, chapter, category))
    confirm.place(x=700, y=600, anchor='center')
    
def choose(root, answer, chapter, category):
    global A_label, checkbuttonA, checkbuttonB, checkbuttonC, checkbuttonD, checkbuttonE, confirm, en, varA, varB, varC, varD, varE
    en=''
    varA =tk.BooleanVar(); varB =tk.BooleanVar(); varC =tk.BooleanVar(); varD =tk.BooleanVar(); varE =tk.BooleanVar()
    checkbuttonA = tk.Checkbutton(root, text='A', font=('Helvetica', 16), variable=varA)
    checkbuttonA.place(x=300, y=500, anchor='center') 
    checkbuttonB = tk.Checkbutton(root, text='B', font=('Helvetica', 16), variable=varB)
    checkbuttonB.place(x=500, y=500, anchor='center')
    checkbuttonC = tk.Checkbutton(root, text='C', font=('Helvetica', 16), variable=varC)
    checkbuttonC.place(x=700, y=500, anchor='center')
    checkbuttonD = tk.Checkbutton(root, text='D', font=('Helvetica', 16), variable=varD)
    checkbuttonD.place(x=900, y=500, anchor='center')
    checkbuttonE = tk.Checkbutton(root, text='E', font=('Helvetica', 16), variable=varE)
    checkbuttonE.place(x=1100, y=500, anchor='center')

    confirm = tk.Button(root, text='Really ?', font=('Helvetica', 16), command=lambda: check(en, answer, root, chapter, category))
    confirm.place(x=700, y=600, anchor='center')

def show_me_answer(root, answer, entry, chapter, category):
    try:
        response = entry.get('1.0', 'end-1c')
        hint.config(text='你的答案是')
        entry.destroy()
        show_answer.destroy()
    except:
        pass
    left = tk.Label(root, text=response, font=('HeiTi',16))
    left.place(x=400, y=450, anchor='center')

    right_hint = tk.Label(root, text='参考答案是', font=('KaiTi',14))
    right_hint.place(x=1000, y=220, anchor='center')
    right = tk.Label(root, text=answer, font=('HeiTi',16), wraplength=500)
    right.place(x=1000, y=450, anchor='center')

    button_start = tk.Button(root, text='继续', font=('KaiTi',16), command=lambda: run(root, chapter, category, True))
    button_start.place(x=400, y=60, anchor="center")

    button_back = tk.Button(root, text="返回", font=('KaiTi',16), command=lambda: chapt(root))
    button_back.place(x=700, y=60, anchor="center")

    button_exit = tk.Button(root, text="走此小道", font=('KaiTi',16), command=lambda: exit(root))
    button_exit.place(x=950, y=60, anchor="center")

def needinput(root, answer, chapter, category):
    global hint, show_answer
    hint = tk.Label(root, text='你可以在这里简单输入答案', font=('KaiTi',14))
    hint.place(x=400, y=220, anchor='center')
    entry = tk.Text(root)
    entry.place(x=400, y=400, anchor='center', width=600, height=300)
    show_answer = tk.Button(root, text='我要看参考答案!', font=('KaiTI',14), command=lambda: show_me_answer(root, answer, entry, chapter, category))
    show_answer.place(x=700, y=650, anchor='center')

def compare(en, answer, root, chapter, category):
    global A_label, button_start, button_exit, button_back
    try:
        checkbuttonA.destroy()
        checkbuttonB.destroy()
        checkbuttonC.destroy()
        checkbuttonD.destroy()
        checkbuttonE.destroy()
        confirm.destroy()
    except:
        checkbutton_yes.destroy()
        checkbutton_no.destroy()
        confirm.destroy()
    if en == answer:
        A_label = tk.Label(root, text=f'对对对，牛牛牛，就是{answer}', font=('HeiTi',14))
    else:
        A_label = tk.Label(root, text=f'错了捏，答案是：{answer}', font=('HeiTi',14), wraplength=600)
    A_label.place(x=700, y=550, anchor='center')

    button_start = tk.Button(root, text='继续', font=('KaiTi',16), command=lambda: run(root, chapter, category, True))
    button_start.place(x=400, y=60, anchor="center")

    button_back = tk.Button(root, text="返回", font=('KaiTi',16), command=lambda: chapt(root))
    button_back.place(x=700, y=60, anchor="center")

    button_exit = tk.Button(root, text="走此小道", font=('KaiTi',16), command=lambda: exit(root))
    button_exit.place(x=950, y=60, anchor="center")

def QA(question, answer, root, chapter, category):
    global Q_label
    Q_label = tk.Label(root, text=question, font=('HeiTi',18))
    Q_label.place(x=700, y=180, anchor='center')
    
    if category == '单选' or category == '多选':
        choose(root, answer, chapter, category)

    if category == '名词解释' or category == '问答' or category == '配伍':
        needinput(root, answer, chapter, category)

    if category == '判断':
        judge(root, answer, chapter, category)

def random_bank(root, chapter, category):
    Q_select = random.choice(list(bank.keys()))
    A_select = bank[Q_select]
    del bank[Q_select]
    QA(Q_select, A_select, root, chapter, category)

def run(root, chapter, category, test): 
    global questions, bank
    for widget in root.winfo_children():
        widget.destroy()
    questions = readfile.read(f'{chapter}.xlsx',category)
    if not test:
        bank = questions.copy()
        random_bank(root, chapter, category)
    else:
        if bank == dict():
            warning = tk.Label(root, text='这部分做完啦，换一部分吧', font=('HeiTi', 18))
            warning.place(x=700, y=350, anchor='center')

            button_back = tk.Button(root, text="返回", font=('KaiTi',16), command=lambda: chapt(root))
            button_back.place(x=400, y=60, anchor="center")

            button_exit = tk.Button(root, text="走此小道", font=('KaiTi',16), command=lambda: exit(root))
            button_exit.place(x=950, y=60, anchor="center")
        else:
            random_bank(root, chapter, category)

def cate(root, chapter): #选定题型
    for widget in root.winfo_children():
        widget.destroy()
    button_category0 = tk.Button(root, text='单选', font=('KaiTi',16),bd=10, command=lambda: run(root, chapter, '单选', False))
    button_category0.place(x=700, y=100 , anchor='center')
    button_category1 = tk.Button(root, text='多选', font=('KaiTi',16),bd=10, command=lambda: run(root, chapter, '多选', False))
    button_category1.place(x=700, y=200 , anchor='center')
    button_category2 = tk.Button(root, text='名词解释', font=('KaiTi',16),bd=10, command=lambda: run(root, chapter, '名词解释', False))
    button_category2.place(x=700, y=300 , anchor='center')
    button_category3 = tk.Button(root, text='问答', font=('KaiTi',16),bd=10, command=lambda: run(root, chapter, '问答', False))
    button_category3.place(x=700, y=400 , anchor='center')
    button_category4 = tk.Button(root, text='判断', font=('KaiTi',16),bd=10, command=lambda: run(root, chapter, '判断', False))
    button_category4.place(x=700, y=500 , anchor='center')
    button_category5 = tk.Button(root, text='配伍', font=('KaiTi',16),bd=10, command=lambda: run(root, chapter, '配伍', False))
    button_category5.place(x=700, y=600 , anchor='center')
    
def chapt(root): #选定章节
    try:
        gif1.close()
        gif2.close()
    except:
        pass

    for widget in root.winfo_children():
        widget.destroy()        
    button_chapter0 = tk.Button(root, text='绪论', font=('KaiTi',16),bd=5, command=lambda: cate(root, '绪论'))
    button_chapter0.place(x=200, y=150 , anchor='center')
    button_chapter1 = tk.Button(root, text='液体制剂', font=('KaiTi',16),bd=5, command=lambda: cate(root, '液体制剂'))
    button_chapter1.place(x=400, y=150 , anchor='center')
    button_chapter2 = tk.Button(root, text='无菌制剂', font=('KaiTi',16),bd=5, command=lambda: cate(root, '无菌制剂'))
    button_chapter2.place(x=600, y=150 , anchor='center')
    button_chapter3 = tk.Button(root, text='固体制剂', font=('KaiTi',16),bd=5, command=lambda: cate(root, '固体制剂'))
    button_chapter3.place(x=800, y=150 , anchor='center')
    button_chapter4 = tk.Button(root, text='半固体制剂', font=('KaiTi',16),bd=5, command=lambda: cate(root, '半固体制剂'))
    button_chapter4.place(x=1000, y=150 , anchor='center')
    button_chapter5 = tk.Button(root, text='气雾粉雾喷雾', font=('KaiTi',16),bd=5, command=lambda: cate(root, '气雾粉雾喷雾'))
    button_chapter5.place(x=1200, y=150 , anchor='center')
    button_chapter6 = tk.Button(root, text='中药制剂', font=('KaiTi',16),bd=5, command=lambda: cate(root, '中药制剂'))
    button_chapter6.place(x=200, y=350 , anchor='center')
    button_chapter7 = tk.Button(root, text='表面活性剂', font=('KaiTi',16),bd=5, command=lambda: cate(root, '表面活性剂'))
    button_chapter7.place(x=400, y=350 , anchor='center')
    button_chapter8 = tk.Button(root, text='制剂稳定性', font=('KaiTi',16),bd=5, command=lambda: cate(root, '制剂稳定性'))
    button_chapter8.place(x=600, y=350 , anchor='center')
    button_chapter9 = tk.Button(root, text='粉体学基础', font=('KaiTi',16),bd=5, command=lambda: cate(root, '粉体学基础'))
    button_chapter9.place(x=800, y=350 , anchor='center')
    button_chapter10 = tk.Button(root, text='制剂设计', font=('KaiTi',16),bd=5, command=lambda: cate(root, '制剂设计'))
    button_chapter10.place(x=1000, y=350 , anchor='center')
    button_chapter11 = tk.Button(root, text='制剂新技术', font=('KaiTi',16),bd=5, command=lambda: cate(root, '制剂新技术'))
    button_chapter11.place(x=1200, y=350 , anchor='center')
    button_chapter12 = tk.Button(root, text='所有章节随机', font=('KaiTi',16),bd=5, command=lambda: cate(root, 'ALL'))
    button_chapter12.place(x=700, y=550 , anchor='center')

def play():
    global gif1, gif2
    def delete():
        root.destroy()
        gif1.close()
        gif2.close()

    root = tk.Tk()
    root.title("Q&A")
    root.geometry('1400x700')
    greet = tk.Label(root, text='Welcome to the Quiz for you!', font=('Helvetica',32))
    greet.place(x=700, y=150, anchor='center')
    button_go = tk.Button(root, text='开始做题！', font=('KaiTi',20), relief='groove',bd=10, command=lambda: chapt(root))
    button_go.place(x=700, y=350 , anchor='center')
    cue = tk.Label(root, text='题目来源：cc98等 \n\n 注意：答案仅供参考，请自行判断。刷题仅为一种应试方法，学习知识需要系统性阅读', font=('HeiTi',18))
    cue.place(x=700, y=550, anchor='center')
    
    pepe1 = tk.Button(root, relief='flat')
    pepe1.place(x=300, y=400, anchor='center')
    gif1=playGif('pepe2.gif')
    gif1.playGif(root, pepe1)
    root.protocol('WM_DELETE_WINDOW',delete)

    pepe2 = tk.Button(root, relief='flat')
    pepe2.place(x=1100, y=400, anchor='center')
    gif2=playGif('pepe.gif')
    gif2.playGif(root, pepe2)
    root.protocol('WM_DELETE_WINDOW',delete)

    root.mainloop()

