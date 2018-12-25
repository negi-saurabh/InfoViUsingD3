
#include <unistd.h>
#include <sys/wait.h>
#include <sys/types.h>
#include <stdlib.h>
#include <string.h>
#include <stdio.h>

#define DELIMITER " \n\t\r"
#define TOKEN_BUFSIZE 64
#define BUFFER 200


int cd_check(char const *line, char const *cmd)
{
        if(line[0] == cmd[0]&&line[1] == cmd[1])
            return 0;
		else
			return -1;
}

int cd(char *dirc){
	
    char path[BUFFER];
	char pwd[BUFFER];
    strcpy(path,dirc);
	// Check for Relative or Absoluate Path 
    if(dirc[0] != '/')
    {
        getcwd(pwd,sizeof(pwd));
        strcat(pwd,"/");
        strcat(pwd,path);
        chdir(pwd);
    }else{
        chdir(dirc);
    }

    return 0;
}

char *get_line(void)
{
	char *buffer = NULL; // address of the first character
	ssize_t buffersize = 0 ; // getline will allocate buffer but it must be reference as a pointer not a literal value 
	getline(&buffer, &buffersize, stdin);
	return buffer;
}


char **parse_line(char *line)
{
	int buffer_size = TOKEN_BUFSIZE; 
	int position = 0;
	char *token = NULL; 
	
	char **args = (char**) malloc(buffer_size*sizeof(char*));;
	
	if(cd_check(line,"exit") == 0){
		exit(0);
	}
	
	if(cd_check(line,"cd") == 0){
			//Checking for space in the line
			token = strchr(line, ' ');
			
			if(token) {
				// printf("token %s",token);
                token = token + 1;
				
                char *locationOfNewLine = strchr(token, '\n');
			    if(locationOfNewLine) {
                    *locationOfNewLine = '\0';
				}
                cd(token);
            }

	}
	else 
	{	
		token = strtok(line, DELIMITER); // strtok breaks string into series of tokens using the delimiter and puts NULL character at the delimiter poistion after every call to STRTOK() , to track tokens
		
		if(token != NULL){
			args[0] = token;
			args[1] = NULL;
		}
	}
 	return args;
}



int execute(char **args){
	
	pid_t pid, wait_pid;
	int status;
	
	if(strcmp(args[0],"exit")==0){
		return 0;
	}
	
	pid = fork();
	//pid returns 0 for child process
	if(pid==0){
		execvp(args[0],args);
		exit(EXIT_FAILURE);
	}
	else if(pid<0){
		perror("Erro calling exec()!\n");
		exit(EXIT_FAILURE);
	}
	else{
		do{
			// waitpid gives more control over which child to wait for while wait(), waits for any child 
			// WUNTRACED The status of any child processes specified by pid that are stopped, and whose status has not yet been reported since they stopped, shall also be reported to the requesting process.
			wait_pid = waitpid(pid, &status, WUNTRACED);
			// need to check if child process ended normally or it was terminated by signal
		}while(!WIFEXITED(status) && !WIFSIGNALED(status));
	
	}
	return 1;
}


int main(void)
{
	char *read_line;
	char **args;
	int status;
	
	// a loop to read evaluate and print
	do {
		// to display prompt in the screen
		printf("$ ");
		// to read the input from the screen
		read_line = get_line();
		args = parse_line(read_line);
		status = execute(args);
		
		free(read_line);
		free(args);
			
	}while(status);
	return 0;
}