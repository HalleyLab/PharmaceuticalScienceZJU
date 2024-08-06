from cx_Freeze import Executable, setup

build_exe_options = {"include_msvcr": True}

executables = [
    Executable(
        "main.py",
        copyright="Copyright (C) 2021 cx_Freeze",
        icon="icon.ico",
    ),
]

setup(
    name="QuizBank.exe",
    version="1.0",
    description="HAHA",
    executables=executables,
    options={
        "build_exe": build_exe_options,
    },
)
