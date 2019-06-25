## Git命令

### 0、安装Git

> 安装不演示
>
> 安装完成后，还需要最后一步设置，在命令行输入：
>
> ````ruby
> $ git config --global user.name "Your Name"
> $ git config --global user.email "email@example.com"
> ````
>
> > 因为Git是分布式版本控制系统，所以，每个机器都必须自报家门：你的名字和Email地址。你也许会担心，如果有人故意冒充别人怎么办？这个不必担心，首先我们相信大家都是善良无知的群众，其次，真的有冒充的也是有办法可查的。
>
> 注意`git config`命令的`--global`参数，用了这个参数，表示你这台机器上所有的Git仓库都会使用这个配置，当然也可以对某个仓库指定不同的用户名和Email地址。

### 1、创建版本库

````ruby
$ mkdir 文件名
$ cd 文件名
$ pwd	#显示当前目录
````

+ 通过`git init`命令把这个目录变成Git可以管理的仓库

````ruby
$ git init
````

+ 用命令`git add`告诉Git，把文件添加到仓库：

````ruby
$ git add 文件名
````

+ 用命令`git commit`告诉Git，把文件提交到仓库：

````ruby
$ git commit -m "提交说明"
````

> add 和commit -m 合用
>
> ````ruby
> git commit -a -m "提交说明"
> ````

> 提交说明可以输入任意内容，当然最好是有意义的，这样你就能从历史记录里方便地找到改动记录。

### 2、git其它命令说明

````ruby
$ git status	#查看当前仓库的状态，会告诉我们那些文件被修改过，但还没提交的修改

$ git diff 		#查看所有本地文件更改。可以附加文件名，以仅显示一个文件的更改。

$ git log 		#查看所有提交历史记录。也可以用于具有git log -p **的文件。输入q退出。
#也可用 Git log --pretty=oneline   更方便查看

$ git blame **  #查看谁更改了**中的内容和时间。
    
$ git reflog 	#显示本地存储库HEAD的更改日志。有助于找到遗失的文件。

````

> 在Git中，用`HEAD`表示当前版本，也就是最新的提交`3628164...882e1e0`（注意我的提交ID和你的肯定不一样），上一个版本就是`HEAD^`，上上一个版本就是`HEAD^^`，当然往上100个版本写100个`^`比较容易数不过来，所以写成`HEAD~100`。

````ruby
$ git reset --hard HEAD^		#回退到上一个版本

#想要再找会之前的版本，只要上面的命令行窗口还没有被关掉 找到版本号的id
$ git reset  --hard 1094a
#版本号不必要写全，写前几位就可以(最好大于5位)，Git会自动去找

#当然，如果上面的命令窗口早已清除了，看不到版本号了，也是有后悔药吃的
$ git reflog		#用来记录你的每一次命令历史，以便确定要回到未来的哪个版本

````

> `git reset`、`git checkout`和`git revert`用于撤消对存储库所做更改的影响。这些命令可能很难理解。
>
> `git reset`和`git checkout`可用于提交和单个文件。
>
> `git revert`仅用于提交级别。
>
> 如果你只是处理尚未合并到协作远程工作中的本地提交，则可以使用这些命令中的任何一个。
>
> 如果你正在协作工作，并且需要撤销在远程分支中的提交，那么就使用`git revert`。

### 3、工作区和暂存区

> **工作区**：就是在电脑里能看到的目录，比如`learngit`文件夹就是个工作区；
>
> **版本库**
>
> 工作区有一个隐藏目录`.git`，这个不算工作区，而是Git的版本库。
>
> Git的版本库中存了很多的东西，最重要的就是称为stage(或叫index)的**暂存区**，还有Git为我们自动创建的第一个分支`master`，以及指向`master`的一个指针`HEAD`。
>
> 前面我们把文件往Git版本库里添加的时候，是分两步执行的：
>
> 第一步：用`git add`把文件添加进去，实际就是把文件修改添加到暂存区；
>
> 第二部：用`git commit`提交更改，实际上就是把暂存区的所有内容提交到当前分支。
>
> 可以简单理解为，需要提交的文件修改通通放到暂存区，然后，一次性提交暂存区的所有修改。

````ruby
#file 是文件名

$ git diff HEAD -- file 		#查看工作区和版本库里面最新版本的区别

$ git checkout -- file		#丢弃在工作区的修改

````

>命令`git checkout -- readme.txt`意思就是，把`readme.txt`文件在工作区的修改全部撤销，这里有两种情况：
>
>一种是`readme.txt`自修改后还没有被放到暂存区，现在，撤销修改就回到和版本库一模一样的状态；
>
>一种是`readme.txt`已经添加到暂存区后，又作了修改，现在，撤销修改就回到添加到暂存区后的状态。
>
>总之，就是让这个文件回到最近一次`git commit`或`git add`时的状态。
>
>`git checkout -- file`命令中的`--`很重要，没有`--`，就变成了“切换到另一个分支”的命令，我们在后面的分支管理中会再次遇到`git checkout`命令。

### 4、删除文件

一般情况下，通常直接在文件管理器中把没用的文件删了，或者用`rm`命令：

````ruby
$ rm 文件名
````

但因此，工作区和版本库就不一致了，通过`git status`命令知道哪些文件被删除了。

所以你有两个选择，

一是确实要从版本库中删除改文件，那就用`git rm`删掉，并且`git commit`:

````ruby
$ git rm 文件名
````

> 小提示：先手动删除文件，然后使用`git rm <file>`和`git add<file>`效果是一样的。

另一种情况是删错了，因为版本库里还有呢，所以可以很轻松地把误删的文件恢复到最新版本：

````ruby
$ git checkout -- 文件名
````

> `git checkout`其实是用版本库里的版本替换工作区的版本，无论工作区是修改还是删除，都可以“一键还原”。

> **注意：**从来没有被添加到版本库就被删除的文件，是无法恢复的！

### 5、远程仓库(学习重点)

> 注册GitHub账号,由于你的本地Git仓库和GitHub仓库之间的传输是通过SSH加密的，所以，需要一点设置：
>
> #####第一步：创建SSH Key。
>
> 在用户主目录下，看看有没有.ssh目录(如C:\Users\Y\.ssh)，若有且，该目录下还存在`id.rsa`和`id.rsa.pub`这两文件，则可以跳过这一步。若没有，就打开Shell（Windows下打开Git Bash），创建SSH Key:
>
> ````ruby
> $ ssh-keygen -t rsa -C "youremail@example.com"
> ````
>
> 把邮件地址换成你自己的邮件地址，然后一路回车，使用默认值即可，由于这个Key也不是用于军事目的，所以也无需设置密码。
>
> 如果一切顺利的话，可以在用户主目录里找到`.ssh`目录，里面有`id_rsa`和`id_rsa.pub`两个文件，这两个就是SSH Key的秘钥对，`id_rsa`是私钥，不能泄露出去，`id_rsa.pub`是公钥，可以放心地告诉任何人。
>
> ##### 第2步：登陆GitHub，打开“Account settings”，“SSH Keys”页面：
>
> 然后，点“Add SSH Key”，填上任意Title，在Key文本框里粘贴`id_rsa.pub`文件的内容,
>
> 点“Add Key”，你就应该看到已经添加的Key。
>
> > GitHub允许你添加多个Key，若有多个电脑，可把每台电脑的Key都添加到GitHub上，这样就可以在每台电脑上往GitHub推送了
>
> > 提示：在GitHub上免费托管的Git仓库，任何人都可见（但只有自己才能改）。
> >
> > 若不想别人可见，方法有二。一是交钱，让GitHub把公开的仓库变成私有的。二是自己动手，搭建一个Git服务器。

### 6、添加远程仓库

> 现在的情景是，你已在本地创建了一个Git仓库后，又想在GitHub创建一个Git仓库，并且让这连个仓库进行远程同步，这样Github上的仓库即可以作为备份，又可以让他人通过该仓库协作。

首先，登录GitHub，在右上角找到“New repository”(新储存库)，创建一个新的储存库。

> 例如创建一个learngit储存库

目前，在GitHub上的这个`learngit`仓库还是空的，GitHub告诉我们，可以从这个仓库克隆出新的仓库，也可以把一个已有的本地仓库与之关联，然后，把本地仓库的内容推送到GitHub仓库。

现在，我们根据GitHub的提示，在本地的`learngit`仓库下运行命令：

````ruby

$ git remote add origin git@github.com:zjcLuKeer/learngit.git
#注意：把上面zjc8739替换成自己的GitHub账户名。

#添加后，远程库的名字就是origin，这是Git默认的叫法，也可以改成别的，但是origin这个名字一看就知道是远程库。
#下一步，就可以把本地库的所有内容推送到远程库上：
$ git push -u origin master

````

把本地库的内容推送到远程，用`git push`命令，实际上是把当前分支`master`推送到远程。

由于远程库是空的，我们第一次推送`master`分支时，加上了`-u`参数，Git不但会把本地的`master`分支内容推送的远程新的`master`分支，还会把本地的`master`分支和远程的`master`分支关联起来，在以后的推送或者拉取时就可以简化命令。

推送成功后，可以立刻在GitHub页面中看到远程库的内容已经和本地一模一样；

从现在起，只要本地作了提交，就可以通过命令：

````ruby
$ git push origin master
````

把本地`master`分支的最新修改推送至GitHub，现在，你就拥有了真正的分布式版本库！

### 7、SSH警告

当你第一次使用Git的`clone`或者`push`命令连接GitHub时，会得到一个警告：

````ruby
The authenticity of host 'github.com (xx.xx.xx.xx)' can't be established.
RSA key fingerprint is xx.xx.xx.xx.xx.
Are you sure you want to continue connecting (yes/no)?
````

这是因为Git使用SSH连接，而SSH连接在第一次验证GitHub服务器的key时，需要你确认GitHub的Key的指纹信息是否真的来自GitHub的服务器，输入`yes`回车即可。

Git会输出一个警告，告诉你已经把GitHub的Key添加到本机的一个信任列表里了，

````ruby
Warning: Permanently added 'github.com' (RSA) to the list of known hosts.
````

这个警告只会出现一次，后面的操作就不会有任何警告了。

### 8、从远程库克隆

使用命令`git clone`克隆一个本地库，例如：

````ruby
$ git clone git@github.com:zjcLuKeer/learngit.git
````

**小结**

要克隆一个仓库，首先必须知道仓库的地址，然后使用`git clone`命令克隆。

Git支持多种协议，包括`https`，但通过`ssh`支持的原生`git`协议速度最快。

### 9、分支管理(学习重点)

#### 1、创建与合并分支

**实战举例**

> 首先，创建一个名字为`dev`的分支，然后切换到`dev`分支上：
>
> ````ruby
> $ git checkout -b dev
> ````
>
> > `git checkout`命令加上`-b`参数表示**创建并切换**，相当于以下两条命令：
> >
> > ````ruby
> > $ git branch dev
> > $ git checkout dev
> > ````
>
> 然后提交：
>
> ````ruby
> $ git add readme.txt 		
> $ git commit -m "branch test"
> ````
>
> 现在，`dev`分支的工作完成，我们就可以切换回`master`分支：
>
> ````ruby
> $ git checkout master
> ````
>
> 切回`master`分支后可以发现，之前在readme.txt文件中添加的内容不见了！
>
> 因为那个提交是在`dev`分支上的，而`master`分支此刻的提交点并没有改变。
>
> 现在，我们把`dev`分支的工作成果合并到`master`分支上：
>
> ````ruby
> $ git merge dev
> Updating d46f35e..b17d20e
> Fast-forward
>  readme.txt | 1 +
>  1 file changed, 1 insertion(+)
> ````
>
> `git merge`命令用于合并**指定分支**到**当前分支**，
>
> 合并后再次查看文件，可以发现和`dev`分支的最新提交是完全一样的。
>
> >注意到上面的`Fast-forward`信息，Git告诉我们，这次合并是“**快进模式**”，也就是直接把`master`指向`dev`的当前提交，所以合并速度非常快。
> >
> >当然，也不是每次合并都能`Fast-forward`，还会有其他方式和合并
>
> 合并完成后，可以安心删除`dev`分支
>
> ````ruby
> $ git branch -d dev
> ````
>
> 删除后，查看**`branch`**，就只剩下`master`分支了
>
> ````ruby
> $ git branch
> * master
> ````

#### 2、小结

Git鼓励大量使用分支：

查看分支：`git branch`

创建分支：`git branch <name>`

切换分支：`git checkout <name>`

创建+切换分支：`git checkout -b <name>`

合并某分支到当前分支：`git merge <name>`

删除分支：`git branch -d <name>`

#### 3、解决冲突

> Git用`<<<<<<<`，`=======`，`>>>>>>>`标记出不同分支的内容

当git无法自动合并分支是，就必须首先解决冲突，解决冲突后，在提交，合并完成。

解决冲突就是把Git合并失败的文件**手动**编辑为我们希望的内容，在提交。

用`git log --graph`命令可以看到分支合并图。

#### 4、分支管理策略

通常，合并分支是，如果可能，Git会用`Fast forward`模式(快进模式)，但这种模式下，删除分支后，会丢掉分支信息。

如果要强制禁用该模式，Git就会在merge时生成一个新的commit，这样，从分支历史上就可以看出分支信息。

下面用`--no-ff`方式的`git merge`

````ruby
$ git checkout -b dev		#创建dev分支
	
$ git add <file>			#修改<file>文件，并提交一个新的commit：
$ git commit -m "file txt"

$ git checkout master		#切换回master

#准备合并dev分支，请注意--no-ff参数，表示禁用Fast forward
$ git merge --no-ff -m "merge with no-ff" dev	

````

合并后，可以用`Git log`查看分支历史

````ruby
$ git log --graph --pretty=oneline --abbrev-commit
````

##### 分支策略

在实际开发中，应该按照以下几个基本原则进行分支管理：

首先，`master`分支应该非常稳定的，也就是仅用来发布新版本，平时不能在上面干活；

干活都在`dev`分支上，也就是说，`dev`分支是不稳定的，到某个时候，比如1.0版本发布时，再把`dev`分支合并到`master`上，在`master`分支发布1.0版本；

你和你的小伙伴们每个人都在`dev`分支上干活，每个人都有自己的分支，时不时地往`dev`分支上合并就可以了。

**合并分支时，加上`--no-ff`参数就可以用普通模式合并，合并后的历史有分支，能看出来曾经做过合并，而`fast forward`合并就看不出来曾经做过合并。**

#### 5、BUG分支

在Git中，分支是很强大的，所以，每个bug都可以通过一个新的临时分支来修复，修复后，合并分支，然后将临时分支删除。

> 当接到一个修复一个代号101的bug的任务是，想创建一个分支`issue-101`来修复它，但，当前正在`dev`上进行的工作还没有提交。但bug必须尽快修复。怎么办？
>
> 幸好，Git提供一个`stash`功能，可以把当前工作现场“储藏”起来，等以后恢复现场后继续工作：
>
> ````ruby
> $ git stash
> Saved working directory and index state WIP on dev: f52c633 add merge
> ````
>
> 现在，用`git status`查看工作区，就是干净的(除非存在没有被Git管理的文件)，因此可以放心的创建分支来修复bug。
>
> 先要确定在哪个分支上修复，假定`master`分支上修复，开始创建临时分支
>
> ````ruby
> $ git checkout master
> $ git checkout -b issue-101		#创建临时分支
> 
> $ git add readme.txt 
> $ git commit -m "fix bug 101"	#修复，并提交commit：
> 
> $ git checkout master			#修复完成后，切换到master分支，
> $ git merge --no-ff -m "merged bug fix 101" issue-101	#并完成合并，最后删除issue-101分支
> 
> $ git checkout dev				#接着回到dev分支干活了
> $ git status
> On branch dev
> nothing to commit, working tree clean
> ````
>
> 工作区是干净的，刚才的工作现场存到哪去了？用`git stash list`命令看看：
>
> ````ruby
> $ git stash list
> stash@{0}: WIP on dev: f52c633 add merge
> ````
>
> 工作现场还在，Git把stash内容存在某个地方了，
>
> 但是需要恢复一下，有两个办法：
>
> 一是用`git stash apply`恢复，但是恢复后，stash内容并不删除，你需要用`git stash drop`来删除；
>
> 另一种方式是用`git stash pop`，恢复的同时把stash内容也删了：
>
> ````ruby
> $ git stash pop
> On branch dev
> Changes to be committed:
>   (use "git reset HEAD <file>..." to unstage)
> 
> 	new file:   hello.py
> 
> Changes not staged for commit:
>   (use "git add <file>..." to update what will be committed)
>   (use "git checkout -- <file>..." to discard changes in working directory)
> 
> 	modified:   readme.txt
> 
> Dropped refs/stash@{0} (5d677e2ee266f39ea296182fb2354265b91b3b2a)
> ````
>
> 再用`git stash list`查看，就看不到任何stash内容了：
>
> ````ruby
> $ git stash list
> ````
>
> 你可以多次stash，恢复的时候，先用`git stash list`查看，然后恢复指定的stash，用命令：
>
> ````ruby
> $ git stash apply stash@{0}
> ````

**小结**

修复BUG时，我们会通过创建新的BUG分支进行修复，然后合并，最后删除；

当手头有工作没有完成，先把工作现场`git stash`一下，然后去修复BUG，修复后，在通过`git stash pop`，回到工作现场。

#### 6、feature分支

软件开发过程中，会有不断的功能加进来，

每加入一个功能时，为了不把主分支搞乱，最好创建一个feature分支，在上面开发，完成后，在合并，最后删除该分支。

> 当你有个新任务：开发代号为101的新功能时：
>
> ````ruby
> $ git checkout -b feature-vulcan
> Switched to a new branch 'feature-vulcan'
> ````
>
> 开发完毕后：
>
> ````ruby
> $ git add vulcan.text
> 
> $ git status
> 
> $ git commit -m "add feature-vulcan"
> 
> ````
>
> 切换回`dev`，合并：
>
> ````ruby
> $ git checkout dev
> ````
>
> 一切顺利的话，feature分支和bug分支是类似的，合并，然后删除。
>
> 但是！
>
> 若该功能要取消！
>
> 虽然白干，但还是要把包含机密的分支文件销毁的
>
> ````ruby
> $ git branch -d feature-vulcan
> error: The branch 'feature-vulcan' is not fully merged.
> If you are sure you want to delete it, run 'git branch -D feature-vulcan'.
> ````
>
> **销毁失败**，Git友情提醒，`feature-vulcan`分支还没有被合并，如果删除，将会丢失修改，如果要强行删除，需要使用大写`-D`参数。即：`git branch -D <name>`
>
> ````ruby
> $ git branch -D feature-vulcan
> Deleted branch feature-vulcan (was 287773e).
> ````
>
> 删除成功。

####**7、多人协作**

当你从远程仓库克隆时，实际上Git自动把本地的`master`分支和远程的`master`分支对应起来，并且，远程仓库的默认名称是`origin`。

要查看远程库的信息，用**`git remote`**

````ruby
$ git remote
origin
````

或者，使用`git remote -v`显示更详细的信息：

````ruby
$ git remote -v
origin  git@github.com:zjcLuKeer/Notes.git (fetch)
origin  git@github.com:zjcLuKeer/Notes.git (push)
````

上面显示了可以抓取和推送的`origin`的地址。**如果没有推送权限，就看不到push的地址**。

##### 1、推送分支

推送分支，就是把该分支上的所有本地提交推送到远程库。推送是，要指定本地分支，这样，Git就会把该分支推动到远程库对应的远程分支上：

````ruby
$ git push origin master
````

若要推送其它分支，比如`dev`:

````ruby
$ git push origin dev
````

**但是**，并不是一定要把本地分支往远程推送，所以要分清那些分支要推送，哪些不需要。

+ `master`分支是主分支，因此要时刻与远程同步；
+ `dev`分支是开发分支，团队所有成员都需要在上面工作，所以也是需要与远程同步；
+ bug分支只用于在本地修复bug，除非要求上传，否则就没必要上传；
+ feature分支是否推到远程，取决于你是否和你的小伙伴合作在上面开发。

##### 2、抓取分支

多人协作是，大家都会往`master`和`dev`分支上推送各自的修改。

> 现在，模拟一个小伙伴，可以在另一台(注意要把SSH Key添加到GitHub)或者同一台电脑的另一个目录下克隆：
>
> ````ruby
> $ git clone git@github.com:zjcluker/learngit.git
> Cloning into 'learngit'...
> remote: Counting objects: 40, done.
> remote: Compressing objects: 100% (21/21), done.
> remote: Total 40 (delta 14), reused 40 (delta 14), pack-reused 0
> Receiving objects: 100% (40/40), done.
> Resolving deltas: 100% (14/14), done.
> ````
>
> 当小伙伴从远程库Clone时，默认情况下，他只能看到本地的`master`分支。不信可以用`git branch`命令查看。
>
> 现在，他要在`dev`分支上开发，就必须创建远程`origin`的`dev`分支到本地,于是他用这个命令创建本地`dev`分支：
>
> ````ruby
> $ git checkout -b dev origin/dev
> ````
>
> 现在，他就可以在`dev`上继续修改，然后，时不时的把`dev`分支`push`到远程：
>
> ````ruby
> $ git add env.txt
> 
> $ git commit -m "add env"
> 
> $ git push origin dev
> Counting objects: 3, done.
> Delta compression using up to 4 threads.
> Compressing objects: 100% (2/2), done.
> Writing objects: 100% (3/3), 308 bytes | 308.00 KiB/s, done.
> Total 3 (delta 0), reused 0 (delta 0)
> To github.com:michaelliao/learngit.git
>    f52c633..7a5e5dd  dev -> dev
> ````
>
> 他已经向`origin/dev`分支推送了他的提交，而碰巧你也对同样的文件作了修改，并试图推送：
>
> ````ruby
> $ cat env.txt
> env
> 
> $ git add env.txt
> 
> $ git commit -m "add new env"
> 
> $ git push origin dev
> To github.com:michaelliao/learngit.git
>  ! [rejected]        dev -> dev (non-fast-forward)
> error: failed to push some refs to 'git@github.com:michaelliao/learngit.git'
> hint: Updates were rejected because the tip of your current branch is behind
> hint: its remote counterpart. Integrate the remote changes (e.g.
> hint: 'git pull ...') before pushing again.
> hint: See the 'Note about fast-forwards' in 'git push --help' for details.
> ````
>
> 推送失败，原因是他的最新提交和你试图推送的提交有冲突，解决方法。先用`git pull`把最新的提交从`origin/dev`抓下来，然后本地合并，解决冲突，在推送：
>
> ````ruby
> $ git pull
> There is no tracking information for the current branch.
> Please specify which branch you want to merge with.
> See git-pull(1) for details.
> 
>     git pull <remote> <branch>
> 
> If you wish to set tracking information for this branch you can do so with:
> 
>     git branch --set-upstream-to=origin/<branch> dev
> ````
>
> `git pull`失败，原因是没有吧本地`dev`分支和远程`origin/dev`分支的链接，根据提示，设置`dev`和`origin.dev`的链接：
>
> ````ruby
> $ git branch --set-upstream-to=origin/dev dev
> Branch 'dev' set up to track remote branch 'dev' from 'origin'.
> ````
>
> 再pull
>
> ````ruby
> $ git pull
> Auto-merging env.txt
> CONFLICT (add/add): Merge conflict in env.txt
> Automatic merge failed; fix conflicts and then commit the result.
> ````
>
> 这回`git pull`成功，但是合并有冲突，需要手动解决，解决的方法和分支管理中的解决冲突一样。解决完在提交，在push

因此，多人协作的工作模式通常是这样的：

1. 首先，可以试图要用`git push origin <branch-name>`推送自己的修改；
2. 如果推送失败，则因为远程分支比你的本地更新，需要先用`git pull`试图合并；
3. 如果合并有冲突，则解决冲突，并在本地提价；
4. 没有冲突或者解决掉冲突后，在用`git push origin <branch-name>`就能推送成功。

如果`git pull`提示`no tracking information`，则说明本地分支和远程分支的链接关系没有创建，用命令`git branch --set-upstream-to <branch-name> origin/<branch-name>`。

######**小结**

+ 查看远程库信息，使用`git remoter -v`;
+ 本地新建的分支如果不推送到远程，对其他人就是不可见的；
+ 从本地推送分支，使用`git push origin brancj-name`，如果推送失败，先用`git pull`抓取远程的新提交；
+ 在本地创建和远程分支对应的分支，使用`git checkout -b branch-name origin/branch-name`，本地和远程分支的名称最好一致；
+ 建立本地分支和远程分支的关联，使用`git branch --set-upstream branch-name origin/branch-name`；
+ 从远程抓取分支，使用`git pull`，如果用冲突，要先处理冲突。

##### 3、Rebase

在上面可以看到，多人在同一个分支上协作是，很容易出现冲突。即使没有冲突，后push的童鞋不得不先pull，在本地合并，然后才能push成功。

总之看上去会很乱。

所以想要Git的提交历史是一跳干净的直线，Git提供一种称之为rebease的操作，有人把它翻译成“变基”。

> 在和远程分支同步后，我们对‘hello.py’这个文件做两次提交。使用`git log`查看结果：
>
> ````ruby
> $ git log --graph --pretty=oneline --abbrev-commit
> * 582d922 (HEAD -> master) add author
> * 8875536 add comment
> * d1be385 (origin/master) init hello
> *   e5e69f1 Merge branch 'dev'
> |\  
> | *   57c53ab (origin/dev, dev) fix env conflict
> | |\  
> | | * 7a5e5dd add env
> | * | 7bd91f1 add new env
> ...
> ````
>
> 注意到Git用`(HEAD -> master)`和`(origin/master)`标识出当前分支的`HEAD`和远程`origin`的位置分别是`582d922 add author`和`d1be385 init hello`，本地分支比远程分支快两个提交。
>
> 现在常识推送本地分支：
>
> ````ruby
> $ git push origin master
> To github.com:michaelliao/learngit.git
>  ! [rejected]        master -> master (fetch first)
> error: failed to push some refs to 'git@github.com:michaelliao/learngit.git'
> hint: Updates were rejected because the remote contains work that you do
> hint: not have locally. This is usually caused by another repository pushing
> hint: to the same ref. You may want to first integrate the remote changes
> hint: (e.g., 'git pull ...') before pushing again.
> hint: See the 'Note about fast-forwards' in 'git push --help' for details.
> ````
>
> 失败了！这说明有人先于我们推送了远程分支。按照经验，先`pull`一下
>
> ````ruby
> $ git pull
> ````
>
> 再用`git status`看看状态
>
> ````ruby
> $ git status
> ````
>
> 加上刚才合并的提交，现在我们本地分支比远程分支超前3个提交。
>
> 在用`git log`看看：
>
> ```ruby
> $ git log --graph --pretty=oneline --abbrev-commit
> *   e0ea545 (HEAD -> master) Merge branch 'master' of github.com:michaelliao/learngit
> |\  
> | * f005ed4 (origin/master) set exit=1
> * | 582d922 add author
> * | 8875536 add comment
> |/  
> * d1be385 init hello
> ...
> ```
>
> 对于强迫症的人，现在事情有点不对头，提交历史分叉了。如果现在把本地分支push到远程，有没有问题？
>
> 有！不好看！
>
> 解决方法，rebase就派上了用场。`git rebase`
>
> ````ruby
> $ git rebase
> First, rewinding head to replay your work on top of it...
> Applying: add comment
> Using index info to reconstruct a base tree...
> M	hello.py
> Falling back to patching base and 3-way merge...
> Auto-merging hello.py
> Applying: add author
> Using index info to reconstruct a base tree...
> M	hello.py
> Falling back to patching base and 3-way merge...
> Auto-merging hello.py
> ````
>
> 再用`git log`看看：
>
> ````ruby
> $ git log --graph --pretty=oneline --abbrev-commit
> * 7e61ed4 (HEAD -> master) add author
> * 3611cfe add comment
> * f005ed4 (origin/master) set exit=1
> * d1be385 init hello
> ...
> ````
>
> >原本分叉的提交现在变成一条直线了！这种神奇的操作是怎么实现的？其实原理非常简单。
> >
> >我们注意观察，发现Git把我们本地的提交“挪动”了位置，放到了`f005ed4 (origin/master) set exit=1`之后，这样，整个提交历史就成了一条直线。rebase操作前后，最终的提交内容是一致的，但是，我们本地的commit修改内容已经变化了，它们的修改不再基于`d1be385 init hello`，而是基于`f005ed4 (origin/master) set exit=1`，但最后的提交`7e61ed4`内容是一致的。
>
> rebase操作的特点：把分叉的提交历史“整理”成一条直线，看上去更直观。缺点是本地的分叉提交已经被修改过了。
>
> 最后，通过push操作吧本地分支推送到远程：
>
> ````ruby
> $ git push origin master
> Counting objects: 6, done.
> Delta compression using up to 4 threads.
> Compressing objects: 100% (5/5), done.
> Writing objects: 100% (6/6), 576 bytes | 576.00 KiB/s, done.
> Total 6 (delta 2), reused 0 (delta 0)
> remote: Resolving deltas: 100% (2/2), completed with 1 local object.
> To github.com:michaelliao/learngit.git
>    f005ed4..7e61ed4  master -> master
> ````
>
> 再用`git log`看看效果：
>
> ````ruby
> $ git log --graph --pretty=oneline --abbrev-commit
> * 7e61ed4 (HEAD -> master, origin/master) add author
> * 3611cfe add comment
> * f005ed4 set exit=1
> * d1be385 init hello
> ...
> ````
>
> 远程分支的提交历史也是一条直线。

**注意**

前面至少要有一个人先提交同一个文件，造成此时要操作的本地git库与远程不符,再在本地git进行提交操作。
并且,重要的是该篇并没有写出`git rebase`处理过程，

使用`git rebase`之后，只是返回冲突出现的提交处的commit，之后要在这个commit中进行解决冲突；

再使用git add操作添加好要解决冲突后的文件；

之后还要再执行一次`git rebase --continu`，到此`git rebase`衍合过程才真正结束。

### 10、标签管理

##### 1、创建标签

在Git中打标签很简单，首先，切换到需要打标签的分支上：

````ruby
$ git branch
* dev
  master
$ git checkout master
Switched to branch 'master'
````

然后，敲命令`git tag <name>`就可以打一个标签：

````ruby
$ git tag v1.0
````

可以使用命令`git tag`查看所有标签：

````ruby
$ git tag
v1.0
````

默认标签是打在最新提交的commit上的。

**若忘记打标签，方法是找到历史提交的 commit id，然后打上就可以了：**

````ruby
$ git log --pretty=oneline --abbrev-commit
````

比如对应的commit id是`f52c633`，敲入命令：

````ruby
$ git tag v0.9 f52c633
````

再用`git tag`查看标签：

````ruby
$ git tag
v0.9
v1.0
````

**注意**，标签不是按照时间顺序列出，而是按字母排序的。可以用`git show <tagname>`查看标签信息：

````ruby
$ git show v0.9
````

还可以创建带有说明的标签，用`-a`指定标签名，`-m`指定说明文字：

````ruby
$ git tag -a v0.1 -m "version 0.1 released" 9cff3e9
````

用命令`git show <tagname>`可以看到说明文字

````ruby
$ git show v0.1
````

**注意**：标签总是和某个commit挂钩。如果这个commit即出现在`master`上，又出现在`dev`分支撒花姑娘，那么在这两个分支上都可以看到这个标签。

##### 2、操作标签

删除标签：

````ruby
$ git tag -b v1.0
````

因为创建的标签都只储存在本地，不会自动推送到远程。所以，打错的标签可以在本地安全删除。

如果要推送某个标签到远程，使用命令`git push origin <tagname>`:

````ruby
$ git push origin v0.8
Total 0 (delta 0), reused 0 (delta 0)
To github.com:zjcLuKeer/Notes.git
 * [new tag]         v0.8 -> v0.8

````

或者，一次性推送全部尚未推送到远程的本地标签：

````ruby
$ git push origin --tags
Total 1 (delta 0), reused 0 (delta 0)
To github.com:zjcLuKeer/Notes.git
 * [new tag]         v0.9 -> v0.9
 * [new tag]         v1.0 -> v1.0
 * [new tag]         v1.1 -> v1.1
````

如果，标签已经推送到远程，想要删除远程标签，要先从本地删除：

````ruby
$ git tag -d v0.8
Deleted tag 'v0.8' (was 3d49b50)
````

然后，从远程删除。删除命令也是`push`，但格式如下：

````ruby
$ git push origin :refs/tags/v0.8
To github.com:zjcLuKeer/Notes.git
 - [deleted]         v0.8
````

######**小结**

- 命令`git push origin <tagname>`可以推送一个本地标签；
- 命令`git push origin --tags`可以推送全部未推送过的本地标签；
- 命令`git tag -d <tagname>`可以删除一个本地标签；
- 命令`git push origin :refs/tags/<tagname>`可以删除一个远程标签。

### 