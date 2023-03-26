import eel
from controller import Controller

eel.init("web")
controller = Controller()

@eel.expose
def input_check(data):
    if data[0] == '*':
        return controller.search(data)
    elif not controller.check_contents(data):
        return False
    return True

@eel.expose
def get_excel_data():
    return controller.get_excel_rows()

@eel.expose
def get_counter():
    return controller.get_total_count()

eel.start("index.html", mode='chrome', size=(1300,700))
