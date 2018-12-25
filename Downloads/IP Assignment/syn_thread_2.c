#include "stdio.h"
#include "stdlib.h"
#include "pthread.h"

pthread_mutex_t mutex = PTHREAD_MUTEX_INITIALIZER;
pthread_cond_t condition_var = PTHREAD_COND_INITIALIZER;

int count = 0;
#define COUNT_DONE 20

void *display1()
{
  int i;
  
  
   // Locking mutex and waiting for signal to relase mutex
  for(i=0;i<10; i++) {
  
   pthread_mutex_lock( &mutex );
   if ( count % 2 != 0 ) {
     pthread_cond_wait( &condition_var, &mutex );
   }
   count++;
   display("ab");
   pthread_cond_signal( &condition_var );
   if ( count >= COUNT_DONE ) {
     pthread_mutex_unlock( &mutex );
     return(NULL);
   }
   pthread_mutex_unlock( &mutex );
 }
}


void *display2()
{
  int i;
  for(i=0;i<10; i++) {
	  
	  pthread_mutex_lock( &mutex );
	  if ( count % 2 == 0 ) {
		pthread_cond_wait( &condition_var, &mutex );
	  }
	  count++;
	  display("cd\n");
	  pthread_cond_signal( &condition_var );
	  if( count >= COUNT_DONE ) {
		pthread_mutex_unlock( &mutex );
		return(NULL);
	  }
	  pthread_mutex_unlock( &mutex );
 }
}


int main() {
	pthread_t thread1, thread2;
	
	char * fucntion_msg1 = "ab";
	char * fucntion_msg2 = "cd\n";
	int return1, return2 ;
	
	return1 = pthread_create(&thread1, NULL, display1, (void *)fucntion_msg1);
	return2 = pthread_create(&thread2, NULL, display2, (void *)fucntion_msg2);
	
	
	//printf("main function after thread creation");
	
	pthread_join(thread1, NULL);
	pthread_join(thread2, NULL);
	
	//printf("first %d\n",return1);
	//printf("second %d\n",return2);
	
	return 0;
}