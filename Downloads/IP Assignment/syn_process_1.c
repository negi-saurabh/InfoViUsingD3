#include <unistd.h>
#include <sys/types.h>
#include <sys/wait.h>
#include <sys/ipc.h>
#include <sys/sem.h>
#include "display.h"



//mutual exclusion 
int main()
{	
	
	int i,status;
	
	pid_t pid ,wait_pid;
	pid = fork();
	if (pid == 0)
	{
		for (i=0;i<10;i++){
			
			display("Hello world\n");
			
		}
	}
	else
	{
		if (wait(&status) >= 0)
			{
			for (i=0;i<10;i++)
				display("Bonjour monde\n");
			}
	}
	return 0;
}