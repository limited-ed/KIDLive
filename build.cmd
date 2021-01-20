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

echo open 10.109.68.68 > ftp.txt
echo exch>> ftp.txt
echo exch>> ftp.txt
echo mdelete publish.zip>> ftp.txt
echo y>> ftp.txt
echo mput publish.zip>> ftp.txt
echo y>> ftp.txt
echo close>> ftp.txt
echo quit>> ftp.txt

ftp -s:ftp.txt

del ftp.txt
del publish.zip
rd /s /q publish
echo Done....