#!/bin/bash

# For Gunicorn use:
# Run with: gunicorn -w 4 -b 0.0.0.0:5000 app:app
# -w refers to the number of worker processes
# -b refers to the binding address

gunicorn -w 4 -b 0.0.0.0:5000 app:app