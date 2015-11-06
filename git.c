#include <stdio.h> 		// for standard output
#include <unistd.h> 	// for fork
#include <sys/types.h>	// for fork	
#include <sys/wait.h>	// for fork
#include <stdlib.h> 	// for malloc
#include <string.h> 	// for strings n stuff

int main(int argc, char** argv) {
	// catch incorrect number of passed-in arguments
	if (argc != 2) {
		puts("Incorrect number of arguments");
		return 1;
	}

	// create commit command for second fork
	char * commit = malloc((strlen("git commit -m \"\"") + strlen(argv[1])) * sizeof(char));
	strcat(commit, "git commit -m \"");
	strcat(commit, argv[1]);
	strcat(commit, "\"");
	// /printf("%s\n", commit);

	/**
	 * We will use fork and run execlp() in the children processes
	 * The commands to run are:
	 * 	git add --all
	 * 	git commit <argv[1]>
	 * 	git push
	 */
	int status;
	pid_t child = fork();

	// git add --all
	if (child == -1) {
		return 1;
	}
	else if (child > 0) {
		pid_t parent = waitpid(child, &status, 0);
	}
	else {
		execlp("bash", "bash", "-c", "git add --all", (char *) NULL);
		puts("You shouldn't see this");
	}

	// git commit -m <COMMIT MESSAGE>
	child = fork();
	if (child == -1) {
		return 1;
	}
	else if (child > 0) {
		pid_t parent = waitpid(child, &status, 0);
	}
	else {
		execlp("bash", "bash", "-c", commit, (char *) NULL);
		puts("You shouldn't see this");
	}

	// git push
	child = fork();
	if (child == -1) {
		return 1;
	}
	else if (child > 0) {
		pid_t parent = waitpid(child, &status, 0);

		return 0;
	}
	else {
		execlp("bash", "bash", "-c", "git push", (char *) NULL);
		puts("You shouldn't see this");
	}

	// git checkout gh-pages
	child = fork();
	if (child == -1) {
		return 1;
	}
	else if (child > 0) {
		pid_t parent = waitpid(child, &status, 0);

		return 0;
	}
	else {
		execlp("bash", "bash", "-c", "git checkout gh-pages", (char *) NULL);
		puts("You shouldn't see this");
	}

	// git merge master
	child = fork();
	if (child == -1) {
		return 1;
	}
	else if (child > 0) {
		pid_t parent = waitpid(child, &status, 0);

		return 0;
	}
	else {
		execlp("bash", "bash", "-c", "git merge master", (char *) NULL);
		puts("You shouldn't see this");
	}

	// git push origin gh-pages
	child = fork();
	if (child == -1) {
		return 1;
	}
	else if (child > 0) {
		pid_t parent = waitpid(child, &status, 0);

		return 0;
	}
	else {
		execlp("bash", "bash", "-c", "git push origin gh-pages", (char *) NULL);
		puts("You shouldn't see this");
	}

	// git checkout master
	child = fork();
	if (child == -1) {
		return 1;
	}
	else if (child > 0) {
		pid_t parent = waitpid(child, &status, 0);

		return 0;
	}
	else {
		execlp("bash", "bash", "-c", "git checkout master", (char *) NULL);
		puts("You shouldn't see this");
	}

	return 0;
}