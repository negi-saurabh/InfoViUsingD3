#include <pthread.h>
#include <stdio.h>
#include <stdlib.h>
#include "display.h"
#include<semaphore.h>

sem_t lock;


void *mydisplay(void *arg)
{	
	int i;
	for (i=0;i<10;i++){
		sem_wait(&lock);
		display(arg);
		sleep(1);
		sem_post(&lock);
	}
	
}

int main() {
	pthread_t thread1, thread2;
	sem_init(&lock, 0, 1);
	char * fucntion_msg1 = "Hello world\n";
	char * fucntion_msg2 = "Bonjour monde\n";
	int return1, return2 ;
	
	return1 = pthread_create(&thread1, NULL, mydisplay, (void *)fucntion_msg1);
	return2 = pthread_create(&thread2, NULL, mydisplay, (void *)fucntion_msg2);
	
	
	//printf("main function after thread creation");
	
	pthread_join(thread1, NULL);
	pthread_join(thread2, NULL);
	
	//printf("first %d\n",return1);
	//printf("second %d\n",return2);
	
	return 0;
}
