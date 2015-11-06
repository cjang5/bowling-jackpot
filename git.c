#include <stdio.h> 		// for standard output
#include <unistd.h> 	// for fork
#include <sys/types.h>	// for fork	
#include <sys/wait.h>	// for fork
#include <stdlib.h> 	// for malloc
#include <string.h> 	// for strings n stuff

int main(int argc, char** argv) {
	// catch incorrect number of passed-in arguments
	if (argc != 3) {
		puts("Incorrect number of arguments");
		return 1;
	}

	// int flag representing whether we're committing to 'master' branch
	// if it's 0, then we will commit to gh-pages
	int master = 0;
	if (!strcmp(argv[1], "-m")) {
		master = 1;
	}

	// create commit command for second fork
	char * commit = malloc((strlen("git commit -m \"\"") + strlen(argv[1])) * sizeof(char));
	strcat(commit, "git commit -m \"");
	strcat(commit, argv[1]);
	strcat(commit, "\"");

	int status; // for forking

	// Do different things based on which branch we're committing to
	if (master) {
		/**
		 * We will use fork and run execlp() in the children processes
		 * The commands to run are:
		 * 	git add --all
		 * 	git commit <argv[1]>
		 * 	git push
		 */

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
	}
	else { // GH-PAGES COMMIT
		// git checkout gh-pages
		pid_t child = fork();
		
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
	}

	return 0;
}