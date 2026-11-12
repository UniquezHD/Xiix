# -*- coding: utf-8 -*-

################################################################################
## Form generated from reading UI file 'UI.ui'
##
## Created by: Qt User Interface Compiler version 6.12.0
##
## WARNING! All changes made in this file will be lost when recompiling UI file!
################################################################################

from PySide6.QtCore import (QCoreApplication, QDate, QDateTime, QLocale,
    QMetaObject, QObject, QPoint, QRect,
    QSize, QTime, QUrl, Qt)
from PySide6.QtGui import (QBrush, QColor, QConicalGradient, QCursor,
    QFont, QFontDatabase, QGradient, QIcon,
    QImage, QKeySequence, QLinearGradient, QPainter,
    QPalette, QPixmap, QRadialGradient, QTransform)
from PySide6.QtWidgets import (QApplication, QComboBox, QLineEdit, QListView,
    QMainWindow, QPushButton, QSizePolicy, QStatusBar,
    QWidget)

class Ui_GameSetup(object):
    def setupUi(self, GameSetup):
        if not GameSetup.objectName():
            GameSetup.setObjectName(u"GameSetup")
        GameSetup.resize(301, 370)
        self.centralwidget = QWidget(GameSetup)
        self.centralwidget.setObjectName(u"centralwidget")
        self.selectGameTypeComboBox = QComboBox(self.centralwidget)
        self.selectGameTypeComboBox.addItem("")
        self.selectGameTypeComboBox.addItem("")
        self.selectGameTypeComboBox.addItem("")
        self.selectGameTypeComboBox.setObjectName(u"selectGameTypeComboBox")
        self.selectGameTypeComboBox.setGeometry(QRect(10, 10, 101, 22))
        self.folderListView = QListView(self.centralwidget)
        self.folderListView.setObjectName(u"folderListView")
        self.folderListView.setGeometry(QRect(10, 130, 281, 192))
        self.selectFolderButton = QPushButton(self.centralwidget)
        self.selectFolderButton.setObjectName(u"selectFolderButton")
        self.selectFolderButton.setGeometry(QRect(210, 10, 81, 21))
        self.StartButton = QPushButton(self.centralwidget)
        self.StartButton.setObjectName(u"StartButton")
        self.StartButton.setGeometry(QRect(10, 330, 281, 21))
        self.ImageField = QLineEdit(self.centralwidget)
        self.ImageField.setObjectName(u"ImageField")
        self.ImageField.setGeometry(QRect(10, 40, 281, 20))
        self.processNameField = QLineEdit(self.centralwidget)
        self.processNameField.setObjectName(u"processNameField")
        self.processNameField.setGeometry(QRect(10, 70, 281, 20))
        self.argsField = QLineEdit(self.centralwidget)
        self.argsField.setObjectName(u"argsField")
        self.argsField.setGeometry(QRect(10, 100, 281, 20))
        self.selectGameButton = QPushButton(self.centralwidget)
        self.selectGameButton.setObjectName(u"selectGameButton")
        self.selectGameButton.setGeometry(QRect(120, 10, 81, 21))
        GameSetup.setCentralWidget(self.centralwidget)
        self.statusbar = QStatusBar(GameSetup)
        self.statusbar.setObjectName(u"statusbar")
        GameSetup.setStatusBar(self.statusbar)

        self.retranslateUi(GameSetup)

        QMetaObject.connectSlotsByName(GameSetup)
    # setupUi

    def retranslateUi(self, GameSetup):
        GameSetup.setWindowTitle(QCoreApplication.translate("GameSetup", u"Game Setup", None))
        self.selectGameTypeComboBox.setItemText(0, QCoreApplication.translate("GameSetup", u"Exe", None))
        self.selectGameTypeComboBox.setItemText(1, QCoreApplication.translate("GameSetup", u"PS2", None))
        self.selectGameTypeComboBox.setItemText(2, QCoreApplication.translate("GameSetup", u"Bin", None))

        self.selectFolderButton.setText(QCoreApplication.translate("GameSetup", u"Select Folder", None))
        self.StartButton.setText(QCoreApplication.translate("GameSetup", u"Start", None))
        self.ImageField.setPlaceholderText(QCoreApplication.translate("GameSetup", u"Image Path", None))
        self.processNameField.setPlaceholderText(QCoreApplication.translate("GameSetup", u"Process Name", None))
        self.argsField.setPlaceholderText(QCoreApplication.translate("GameSetup", u"Args", None))
        self.selectGameButton.setText(QCoreApplication.translate("GameSetup", u"Select Game", None))
    # retranslateUi

