# Didux.IO Template Frontend

# Make a private fork

First, create a new (private) repo through the github ui.

## 1. Clone boilerplate
```
git clone --bare git@github.com:didux-io/Boilerplate-Frontend.git
cd Boilerplate-Frontend.git
git push --mirror git@github.com:didux-io/<new project>.git
cd ..
rm -rf Boilerplate-Frontend.git
```

## 2. Clone new project
```
git clone git@github.com:didux-io/<new project>.git
cd <new project>
make some changes
git commit
git push origin main
```

## 3. Pull latest boilerplate changes
```
cd <new project>
git remote add public git@github.com:didux-io/Boilerplate-Frontend.git
git pull public main # Creates a merge commit
git push origin main
```
