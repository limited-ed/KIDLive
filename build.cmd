@echo off
rd /s /q publish
cd kidapi
dotnet publish -c Release -o ..\publish -r ubuntu-x64 --self-contained true
cd ..\kidapp
call ng build --prod

xcopy dist\wwwroot ..\publish\wwwroot /i /s
cd ..
del publish.zip
7z.exe a -r publish.zip .\publish\*

tftp -i 10.109.225.188 put publish.zip

del publish.zip
rd /s /q publish
echo Done....