from ui import Ui_GameSetup
from PySide6.QtWidgets import QApplication, QMainWindow, QFileDialog
from PySide6 import QtCore

#pyside6-uic UI.ui -o ui.py
    
class Window(QMainWindow, Ui_GameSetup):

    selectedGameType = "Exe"

    def __init__(self):
        super().__init__()
        self.setupUi(self)

        self.selectFolderButton.clicked.connect(self.SelectFolder)
        self.selectGameButton.clicked.connect(self.SelectGame)
        self.StartButton.clicked.connect(self.Start)

        self.selectGameTypeComboBox.currentIndexChanged.connect(self.onChangeComboBox)


    def onChangeComboBox(self, value):
        self.selectedGameType = self.selectGameTypeComboBox.itemText(value)
        print(self.selectedGameType)
    
    @QtCore.Slot()
    def SelectGame(self):
        print("1")
        dialog = QFileDialog(self)
        dialog.setFileMode(dialog.FileMode.AnyFile)
        dialog.open()
        if dialog.exec():
            print(dialog.fileSelected)
            print(3)

    def SelectFolder(self):
        print("2")
        dialog = QFileDialog(self)
        dialog.setFileMode(dialog.FileMode.Directory)
        dialog.open()

    def Start(self):
        print("3")

        argsText = self.argsField.text()
        coverText = self.ImageField.text()
        processNameText = self.processNameField.text()

        gameData = {
            "folderName": "",
            "name": "",
            "processName": processNameText,
            "exePath": "",
            "args": argsText,
            "cover": coverText,
            "type": self.selectedGameType,
        }

        print(gameData)

if __name__ == '__main__':
    app = QApplication([])
    window = Window()
    window.show()
    app.exec()