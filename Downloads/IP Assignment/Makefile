all: mysh1 mysh2 syn_process_1 syn_process_2 syn_thread_1 syn_thread_2

mysh1:
	gcc mysh1.c -o mysh1
mysh2:
	gcc mysh2.c -o mysh2
display: display.h
	gcc display.c -o display
syn_process_1:
	gcc syn_process_1.c display.c -o syn_process_1
syn_process_2:
	gcc syn_process_2.c display.c -o syn_process_2
syn_thread_1:
	gcc syn_thread_1.c display.c -o syn_thread_1 -pthread
syn_thread_2:
	gcc syn_thread_2.c display.c -o syn_thread_2 -pthread
  
	
