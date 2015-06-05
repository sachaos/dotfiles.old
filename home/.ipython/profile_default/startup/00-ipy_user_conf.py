def _load_venv():
    import os
    if 'VIRTUAL_ENV' in os.environ:
        activate_this = os.path.join(os.environ['VIRTUAL_ENV'], 'bin/activate_this.py')
        with open(activate_this) as f:
            exec(f.read(), dict(__file__=activate_this))

_load_venv()
del _load_venv
