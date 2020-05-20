# Docker

**목차**

[컨테이너 따로따로 만들어보기](##컨테이너-따로따로-만들어보기)

* [MySQL](###MySQL)

* [Django](###Django)
  * [1. Python 이미지를 pull해서 직접 장고 설치해보기](###1.-Python-이미지를-pull해서-직접-장고-설치해보기)
  * [2. 옵션값을 이용하여 서버가 알아서 백그라운드에서 돌아가게 만들기](2.-옵션값을-이용하여-서버가-알아서-백그라운드에서-돌아가게-만들기)

[DockerFile]()

[Docker-compose]()

<hr>

* 윈도우에서 `bash`를 이용해 도커를 실행시키려고 하면 다음과 같은 에러가 난다. 윈도우에서는 `powershell`을 쓰자.

  ```bash
  $ the input device is not a TTY.  If you are using mintty, try prefixing the command with 'winpty'
  bash: the: command not found
  ```

* `docker run`과 `docker exec`의 차이:

  * `run`: 이미지가 없으면 `docker-hub`에서 공식이미지를 `pull`해와서 컨테이너를 만듦. 만약 컨테이너는 존재하는데 `exited` 상태라면 다시 켜줌
  * `exec`: 켜져 있는 컨테이너만 실행 가능

* `docker kill`: `detached` 모드(백그라운드 모드)에서 실행중인 컨테이너를 끔

* `docker restart`: 꺼져있는 컨테이너를 다시 켬

* `docker rm $(docker ps -a -q) `: 꺼져있는 컨테이너까지 모든 컨테이너 삭제

  * `-a` all 옵션으로 꺼져있는 컨테이너까지 모든 컨테이너 상태 출력 가능

  * `-q` quiet 옵션으로 컨테이너 id만 출력 가능

  * 그래서 `docker ps -a -q` 명령어만 단독으로 입력하면 다음과 같이 컨테이너 아이디만 나온다.

    ```powershell
    PS C:\Users\multicampus\desktop\pupfit\back> docker ps -a -q
    e780c451d178
    2b75e31c0c88
    5e26db3c91ea
    ```

  * `docker rm e780c451d178 2b75e31c0c88 5e26db3c91ea`과 같이 여러 개의 컨테이너를 띄어쓰기로 구분해서 삭제할 수 있다.

  * 따라서 `docker rm $(docker ps -a -q) `와 `docker rm e780c451d178 2b75e31c0c88 5e26db3c91ea`는 같은 의미임

* `apt-get update`: 리눅스에서 현재 있는, 다운받은 파일을 최신버전으로 업데이트하는 명령어

* `vim`은 리눅스에 기본으로 설치되어 있지 않음. `apt-get`으로 다운받아야 함.
  
  * `vim DockerFile`로 도커 파일 수정 가능
* 당연한 얘기지만 `git`도 리눅스에 기본으로 설치되어 있지 않으므로 `sudo apt-get install git`으로 설치
* `entrypoint.sh`: 환경변수 지정해주는 파일
  
* `.sh`: shell 확장자
  
* `ssh(secure shell)`: 서버와 서버 사이에서 통신하기 위한 통신 프로토콜

* `ssh ubuntu@i02b208.p.ssafy.io -i J02B208.pem`
  * ubuntu는 username 골뱅이 뒤에는 주소 맨뒤에는 인증 키 파일 경로 써주면 됨
  * aws에 접속할 수 잇음!
* `netstat -ano`로 몇 번 포트를 누가 쓰고 있는지 확인 가능. `PID`로 누가 쓰고있는지 확인한 후 작업관리자에서 그 프로그램 중지 가능.
  * `-a`: 모든 연결과 수신 대기 포트 표시
  * `-n`: 주소와 포트 번호를 숫자 형식으로 표시
  * `-o`: 각 연결의 소유자 프로세스 ID 표시

* `ctrl + shift +esc` : 작업관리자 단축키

## 컨테이너 따로따로 만들어보기

### MySQL

```powershell
PS C:\Users\multicampus> docker run --name db -e MYSQL_ROOT_PASSWORD=hongsi -d mysql:latest
Unable to find image 'mysql:latest' locally
latest: Pulling from library/mysql
afb6ec6fdc1c: Pull complete
0bdc5971ba40: Pull complete
97ae94a2c729: Pull complete
f777521d340e: Pull complete
1393ff7fc871: Pull complete
a499b89994d9: Pull complete
7ebe8eefbafe: Pull complete
597069368ef1: Pull complete
ce39a5501878: Pull complete
7d545bca14bf: Pull complete
0f5f78cccacb: Pull complete
623a5dae2b42: Pull complete
Digest: sha256:beba993cc5720da07129078d13441745c02560a2a0181071143e599ad9c497fa
Status: Downloaded newer image for mysql:latest
5e26db3c91ea252deb87be3271fe9bf94e6e743573e2b139c54b913870c51455
```

이 상태에서 이미지 조회

```powershell
PS C:\Users\multicampus> docker images
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
mysql               latest              94dff5fab37f        2 days ago          541MB
```

이 상태에서 컨테이너 조회

```bash
PS C:\Users\multicampus> docker ps
CONTAINER ID        IMAGE               COMMAND                  CREATED              STATUS              PORTS                 NAMES
5e26db3c91ea        mysql:latest        "docker-entrypoint.s…"   About a minute ago   Up About a minute   3306/tcp, 33060/tcp   db
```

`-d` 옵션으로 컨테이너가 백그라운드에서 켜져있으니까 `exec`으로 실행시킬 수 있음

```powershell
PS C:\Users\multicampus> docker exec -it db bash
```

이러면 컨테이너 안에서 bash를 실행시킬 수 있게 됨

mysql을 켜보자.

컨테이너를 생성할 때 `username`을 입력하지 않았으므로 기본값인 `root`로 설정되어 있음. `password`는 `hongsi`로 설정하였으므로, `-p` 옵션까지만 치고 나서 엔터를 누르고, 비밀번호를 입력하라고 할 때 `hongsi`를 입력해주면 mysql이 실행됨

```bash
root@5e26db3c91ea:/# mysql -u root -p
Enter password:
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 11
Server version: 8.0.20 MySQL Community Server - GPL

Copyright (c) 2000, 2020, Oracle and/or its affiliates. All rights reserved.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

mysql>
```

* mysql 간단하게 다뤄보기

  ```mysql
  mysql> CREATE DATABASE pupfit;
  Query OK, 1 row affected (0.02 sec)
  mysql> USE pupfit;
  Database changed
  mysql> CREATE TABLE user (
      -> id INTEGER PRIMARY KEY,
      -> name TEXT
      -> );
  Query OK, 0 rows affected (0.04 sec)
  mysql> INSERT INTO user VALUES (1, 'yang'), (2, 'hye');
  Query OK, 2 rows affected (0.02 sec)
  Records: 2  Duplicates: 0  Warnings: 0
  mysql> SELECT * FROM user;
  +----+------+
  | id | name |
  +----+------+
  |  1 | yang |
  |  2 | hye  |
  +----+------+
  2 rows in set (0.00 sec)
  mysql> exit
  Bye
  ```

컨테이너에서 빠져 나오기

```powershell
root@5e26db3c91ea:/# exit
exit
```

### Django

#### 1. Python 이미지를 pull해서 직접 장고 설치해보기

python 3.6.8버전 이미지를 pull 받아서 컨테이너를 만들어보자.

* `-v` volume 옵션을 사용해서 현재 디렉토리에 있는 파일들을 컨테이너 안의 `/usr/src/app` 디렉토리 안에 다 복붙(?) 해주었다.
* `-w` working directory 옵션을 사용해서 `/usr/src/app` 디렉토리로 이동했다.
* `-p` port 옵션을 사용해서 로컬의 8000포트로 요청이 들어왔을 때 컨테이너의 8000포트로 요청이 들어가도록 포트를 바인딩해주었다.
* `-it` interactive, TTY 옵션을 이용해서 컨테이너 내부에서 명령어를 입력할 수 있게 했다.
* 컨테이너 내부의 `/bin` 폴더에 있는 `bash`로 명령어를 입력할 수 있도록 `bash`를 실행시켰다. 

```powershell
PS C:\Users\multicampus\desktop\pupfit\back> docker run -v ${PWD}:/usr/src/app -w /usr/src/app -p 8000:8000 -it python:3.6.8 /bin/bash
```

종속성을 설치해준다.

```bash
root@5cbb82d0a7d9:/usr/src/app# pip install -r requirements.txt
Collecting asgiref==3.2.7 (from -r requirements.txt (line 1))
  Downloading https://files.pythonhosted.org/packages/68/00/25013f7310a56d17e1ab6fd885d5c1f216b7123b550d295c93f8e29d372a/asgiref-3.2.7-py2.py3-none-any.whl
Collecting Django==3.0.6 (from -r requirements.txt (line 2))
  Downloading https://files.pythonhosted.org/packages/9d/04/04abb097c84c770180eeebe7ed920ce42f9917ab5ad4de01ff8ed11bc25b/Django-3.0.6-py3-none-any.whl (7.5MB)
     |████████████████████████████████| 7.5MB 17.3MB/s
Collecting pytz==2020.1 (from -r requirements.txt (line 3))
  Downloading https://files.pythonhosted.org/packages/4f/a4/879454d49688e2fad93e59d7d4efda580b783c745fd2ec2a3adf87b0808d/pytz-2020.1-py2.py3-none-any.whl (510kB)
     |████████████████████████████████| 512kB 8.3MB/s
Collecting sqlparse==0.3.1 (from -r requirements.txt (line 4))
  Downloading https://files.pythonhosted.org/packages/85/ee/6e821932f413a5c4b76be9c5936e313e4fc626b33f16e027866e1d60f588/sqlparse-0.3.1-py2.py3-none-any.whl (40kB)
     |████████████████████████████████| 40kB 3.3MB/s
Installing collected packages: asgiref, sqlparse, pytz, Django
Successfully installed Django-3.0.6 asgiref-3.2.7 pytz-2020.1 sqlparse-0.3.1
WARNING: You are using pip version 19.1.1, however version 20.1 is available.
You should consider upgrading via the 'pip install --upgrade pip' command.
```

`localhost:8000`으로 Django를 실행시킨다.

```bash
root@5cbb82d0a7d9:/usr/src/app# python manage.py runserver 0.0.0.0:8000
Watching for file changes with StatReloader
Performing system checks...

System check identified no issues (0 silenced).

You have 17 unapplied migration(s). Your project may not work properly until you apply the migrations for app(s): admin, auth, contenttypes, sessions.
Run 'python manage.py migrate' to apply them.

May 18, 2020 - 14:50:20
Django version 3.0.6, using settings 'pupfit.settings'
Starting development server at http://0.0.0.0:8000/
Quit the server with CONTROL-C
```

인터넷 창을 열어 `local:host`로 이동하면 장고 페이지가 보인다!

```bash
root@5cbb82d0a7d9:/usr/src/app# exit
exit
```

다른 방식을 시도해보기 위해 컨테이너를 나간다.

이 상태에서 이미지 조회

```powershell
PS C:\Users\multicampus\desktop\pupfit\back> docker images
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
mysql               latest              94dff5fab37f        2 days ago          541MB
python              3.6.8               48c06762acf0        11 months ago       924MB
```

이 상태에서 컨테이너 조회

```powershell
PS C:\Users\multicampus\desktop\pupfit\back> docker ps
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                 NAMES
5e26db3c91ea        mysql:latest        "docker-entrypoint.s…"   4 hours ago         Up 2 hours          3306/tcp, 33060/tcp   db
```

? mysql 컨테이너만 나온다. 그럼 이번엔 실행되고 있지 않은 컨테이너까지 모두 조회

```powershell
PS C:\Users\multicampus\desktop\pupfit\back> docker ps -a
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS                      PORTS                 NAMES
5cbb82d0a7d9        python:3.6.8        "/bin/bash"              11 minutes ago      Exited (0) 20 seconds ago                         quirky_vaughan
5e26db3c91ea        mysql:latest        "docker-entrypoint.s…"   4 hours ago         Up 2 hours                  3306/tcp, 33060/tcp   db
```

방금 만들었던 컨테이너가 보인다. `exit`해서 백그라운드에서 실행되고 있지 않아서 `docker ps`로는 조회할 수 없었던 것이다.

포트 번호가 겹칠 수 있으니 컨테이너를 삭제한다.

```powershell
PS C:\Users\multicampus\desktop\pupfit\back> docker rm quirky_vaughan
quirky_vaughan
```

#### 2. 옵션값을 이용하여 서버가 알아서 백그라운드에서 돌아가게 만들기

앞에서 손수 쳐줬던 걸 옵션값을 이용하여 한 줄로 끝냈다.

* `-d` detached 옵션을 이용하여 백그라운들에서 돌아가게 했다.
* `--name` 옵션을 이용하여 컨테이너 이름을 `pupfit_django`로 지정했다. 원래는 랜덤으로 `nauty_bohr`과 같은 `형용사 + 과학자 이름`을 랜덤으로 이름붙여줬었다.

```powershell
PS C:\Users\multicampus\desktop\pupfit\back> docker run --name pupfit_django -v ${PWD}:/usr/src/app -w /usr/src/app -d -p 8000:8000 python:3.6.8 /bin/bash -c "pip install -r requirements.txt && python manage.py runserver 0.0.0.0:8000"
e780c451d178cead602faf271aaf5c714c23ecf61ea1840e46cde3c53fc9ac0f
```

이미지 조회

```powershell
PS C:\Users\multicampus\desktop\pupfit\back> docker images
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
mysql               latest              94dff5fab37f        2 days ago          541MB
python              3.6.8               48c06762acf0        11 months ago       924MB
```

컨테이너 조회

```powershell
PS C:\Users\multicampus\desktop\pupfit\back> docker ps
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                    NAMES
e780c451d178        python:3.6.8        "/bin/bash -c 'pip i…"   19 seconds ago      Up 18 seconds       0.0.0.0:8000->8000/tcp   pupfit_django
5e26db3c91ea        mysql:latest        "docker-entrypoint.s…"   4 hours ago         Up 3 hours          3306/tcp, 33060/tcp      db
```

`detached` 모드(백그라운드 모드)로 컨테이너를 실행시키고 있는데 만약 해당 컨테이너의 로그를 보고 싶다면, 도커의 `attach` 명령어를 사용하여 `powershell`에서 장고의 로그를 볼 수 있다.

```powershell
PS C:\Users\multicampus\desktop\pupfit\back> docker attach pupfit_django
[18/May/2020 15:15:48] "GET / HTTP/1.1" 200 16351
[18/May/2020 15:15:57] "GET / HTTP/1.1" 200 16351
[18/May/2020 15:15:57] "GET / HTTP/1.1" 200 16351
```



## Docker Hub

**Github처럼 리포 먼저 안 만들고 해도 됨. push하면 리포가 알아서 만들어져 있음**

`docker-compose -p pupfit up`을 하고 난 후 이미지 조회

* `-p` project-name 옵션. 프로젝트 이름을 `pupfit`으로 바꾸면 이미지 이름이 `pupfit`이 될 줄 알았는데 아니었다...

```powershell
PS C:\Users\multicampus\desktop\pupfit\server> docker images
REPOSITORY                TAG                 IMAGE ID            CREATED             SIZE
pupfit_django             latest              a59b400bf0f8        8 minutes ago       974MB
python                    3.8.3               659f826fabf4        6 hours ago         934MB
mysql                     latest              94dff5fab37f        4 days ago          541MB
```

`docker tag {현재 있는 이미지} {docker hub username}/{바꾸려는 이미지 이름}:{버전}` : 이미지에 태그 달기

이미지 이름 변경 가능!

```powershell
PS C:\Users\multicampus\desktop\pupfit\server> docker tag pupfit_django yang94lol/pupfit_server:0.1
```

이미지 잘 만들어졌나 확인

```powershell
PS C:\Users\multicampus\desktop\pupfit\server> docker images
REPOSITORY                TAG                 IMAGE ID            CREATED             SIZE
pupfit_django             latest              a59b400bf0f8        8 minutes ago       974MB
yang94lol/pupfit_server   0.1                 a59b400bf0f8        8 minutes ago       974MB
python                    3.8.3               659f826fabf4        6 hours ago         934MB
mysql                     latest              94dff5fab37f        4 days ago          541MB
```

`docker push {username}/{image name}:{tag}`: Docker hub에 push하기

```powershell
PS C:\Users\multicampus\desktop\pupfit\server> docker push yang94lol/pupfit_server:0.1
The push refers to repository [docker.io/yang94lol/pupfit_server]
362fe895e9ea: Pushed
4bd6a53d8fea: Pushed
28f4de6aaa75: Pushed
5bf497fc7ae4: Pushed
079e0a70bca0: Pushed
569e5571a3eb: Pushed
697765a85531: Pushed
8c39f7b1a31a: Pushed
88cfc2fcd059: Pushed
760e8d95cf58: Pushed
7cc1c2d7e744: Pushed
8c02234b8605: Pushed
0.1: digest: sha256:c39c4c2065619445108efa40396a1c0505aabfb40cbab41f810e7541468dd1fd size: 2843
```

