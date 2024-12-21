import os

def create_project_structure():
    """Create a standard data science project directory structure."""
    # Main project directories
    directories = [
        'data/raw',
        'data/processed',
        'data/external',
        'notebooks',
        'src/data',
        'src/features',
        'src/models',
        'src/visualization',
        'tests',
        'reports/figures'
    ]
    
    # Create directories
    for dir_path in directories:
        os.makedirs(dir_path, exist_ok=True)
        print(f"Created directory: {dir_path}")
        # Create .gitkeep files in empty directories
        if dir_path.startswith('data/'):
            with open(os.path.join(dir_path, '.gitkeep'), 'w') as f:
                pass

    # Create essential files
    files_to_create = {
        'requirements.txt': '''numpy==1.21.6
pandas==1.4.4
matplotlib==3.5.3
seaborn==0.12.2
scikit-learn==1.0.2
jupyter==1.0.0
black==22.3.0
pytest==7.1.3
python-dotenv==0.21.0
''',
        '.gitignore': '''# Python
__pycache__/
*.py[cod]
*$py.class
.Python
env/
build/
develop-eggs/
dist/
downloads/
eggs/
.eggs/
lib/
lib64/
parts/
sdist/
var/
wheels/
*.egg-info/
.installed.cfg
*.egg

# Jupyter Notebook
.ipynb_checkpoints

# Environment
.env
.venv
venv/
ENV/

# IDE
.vscode/
.idea/
''',
        'src/__init__.py': '',
        'src/data/__init__.py': '',
        'src/features/__init__.py': '',
        'src/models/__init__.py': '',
        'src/visualization/__init__.py': '',
        'notebooks/01_initial_data_exploration.ipynb': '''{
 "cells": [
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "# Initial Data Exploration\\n",
    "This notebook contains initial data exploration and analysis."
   ]
  },
  {
   "cell_type": "code",
   "execution_count": null,
   "metadata": {},
   "outputs": [],
   "source": [
    "# Standard data science imports\\n",
    "import numpy as np\\n",
    "import pandas as pd\\n",
    "import matplotlib.pyplot as plt\\n",
    "import seaborn as sns\\n",
    "\\n",
    "# Display settings\\n",
    "%matplotlib inline\\n",
    "plt.style.use('seaborn')\\n",
    "sns.set_theme()\\n",
    "\\n",
    "# Display all columns\\n",
    "pd.set_option('display.max_columns', None)"
   ]
  }
 ],
 "metadata": {
  "kernelspec": {
   "display_name": "Python 3",
   "language": "python",
   "name": "python3"
  }
 },
 "nbformat": 4,
 "nbformat_minor": 4
}'''
    }

    # Create files with content
    for file_path, content in files_to_create.items():
        # Ensure directory exists before creating file
        directory = os.path.dirname(file_path)
        if directory:
            os.makedirs(directory, exist_ok=True)
        
        # Write file content
        with open(file_path, 'w') as f:
            f.write(content)
        print(f"Created file: {file_path}")

    print("\nProject structure created successfully!")

if __name__ == "__main__":
    create_project_structure()