#! sh
app_name="system-info"

# 创建app.nw文件
rm -rf output
cd ../ && rm -rf output && mkdir output
cp -r $app_name/* output
rm -rf output/Info.plist output/build.sh output/app.icns
cd output/
find . -type d -name ".svn" | xargs rm -rf
zip -r ../app.nw * > /dev/null;
rm -rf * && cd ../ && mv app.nw output/
mv output $app_name/ && cd $app_name
echo "create nw file success!"

#下载基础包
svn co svn://localhost/node-webkit-base output > /dev/null

#创建mac版本app
cd output
unzip mac-os-x.zip -d mac-os-x > /dev/null
rm -rf mac-os-x.zip mac-os-x/nwsnapshot
if [ -f ../Info.plist ];then
    cp ../Info.plist mac-os-x/node-webkit.app/Contents/
fi
cp app.nw mac-os-x/node-webkit.app/Contents/Resources/
if [ -f ../app.icns ];then
    cp ../app.icns mac-os-x/node-webkit.app/Contents/Resources/
fi
mv mac-os-x/node-webkit.app mac-os-x/$app_name.app
echo "create mac os app success!"

#创建windows版本app
unzip win-32.zip -d win-32 > /dev/null
rm -rf win-32.zip win-32/nwsnapshot
cp app.nw win-32/ && cd win-32
cat nw.exe app.nw > $app_name.exe
rm -rf nw.exe nwsnapshot.exe
cd ..
echo "create windows app success!"

#删除app.nw
rm -f app.nw