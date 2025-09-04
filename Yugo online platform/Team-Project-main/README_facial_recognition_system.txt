Facial recognition and model training setup on windows:

	a.Install Microsoft Visual Studio

	b.Install Anaconda
		Download and install anaconda following the steps:https://docs.anaconda.com/anaconda/install/windows/
	
	c.Download and install the latest NVIDIA CUDA Toolkit and cuDNN
		Download NVIDIA CUDA Toolkit from https://developer.nvidia.com/cuda-toolkit-archive
		Download cuDNN from https://developer.nvidia.com/rdp/cudnn-archive
		Install CUDA by simply running the executable file (.exe)
		Unzip the cuDNN library and move all the files to the CUDA directory

	d.Create a virtual environment and install python
		Open Anaconda Prompt and type the following command: conda create -n python_tensorflow
		Activate the environment: conda activate python_tensorflow

	e.Using the Anaconda Promt install the following packages in the environment created:
		Tensorflow: pip install tensorflow
		Numpy: pip install numpy
		OpenCV: pip install opencv-python
		Flask:  pip install Flask
		IPython: pip install ipython
		Json:  pip install jsonlib
		Jupyter: pip install jupyter

	f.Create a new folder using jupyer notebook and paste the code inside

	g.Open and run the code.
		In Jupyter Notebook click on kernel and then on restart and run all
	
	h.Hardware requirements
		Processor: Intel core i5
		Ram:16GB
		GPU:7GB comaptible with tensorflow, CUDA and cuDNN	
		

		