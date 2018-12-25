#include <unistd.h>
#include <sys/types.h>
#include <sys/wait.h>
#include <sys/ipc.h>
#include <sys/sem.h>
#include "display.h"

int main()
{

	struct sembuf down = {0, -1, 0};
    struct sembuf up = {0, 1, 0};
	int i, my_sem,ret;
	my_sem = semget(IPC_PRIVATE, 1, 0600);
	if (fork())
	{
	for (i=0;i<10;i++){
		display("ab");
		semop(my_sem, &up, 1);
		sleep(1);
	}
	}
	else
	{
	for (i=0;i<10;i++){
		
		ret = semop(my_sem, &down, 1);
		
		if(ret==0)
		display("cd\n");
	}
	}
	return 0;
}