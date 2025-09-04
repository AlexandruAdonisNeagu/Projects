Facial training and testing setup on windows:

The models created are to big to be added on the GitHub.
The whole proccess must to be recreated in order to make the application to run.

	a.Install Microsoft Visual Studio

	b.Install Anaconda
		Download and install anaconda following the steps:https://docs.anaconda.com/anaconda/install/windows/
	
	c.Download and install the latest NVIDIA CUDA Toolkit and cuDNN
		Download NVIDIA CUDA Toolkit from https://developer.nvidia.com/cuda-toolkit-archive
		Download cuDNN from https://developer.nvidia.com/rdp/cudnn-archive
		Install CUDA by simply running the executable file (.exe)
		Unzip the cuDNN library and move all the files to the CUDA directory
		Download haarcascade_frontalface_defaul

	d.Create a virtual environment and install python
		Open Anaconda Prompt and type the following command: conda create -n python_tensorflow
		Activate the environment: conda activate python_tensorflow

	e.Using the Anaconda Promt install the following packages in the environment created:
		Tensorflow: pip install tensorflow
		Numpy: pip install numpy
		OpenCV: pip install opencv-python
		IPython: pip install ipython
		Jupyter: pip install jupyter
		KerasTuner:pip install -q -U keras-tuner
		Pandas:pip install pandas
		Seaborn:pip install seaborn
		Scikit-learn:pip install -U scikit-learn
		Itertools:pip install more-itertools

	f.Open and run the code.
		In Jupyter Notebook click on kernel and then on restart and run all
		Save the models in Models folder
		Run the GUI
	
	g.Hardware requirements
		Processor: Intel core i7
		Ram:32GB
		GPU:8GB compatible with tensorflow, CUDA and cuDNN	
		


		
