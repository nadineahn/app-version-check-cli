

// 보류 .. rpm 파일을 unzip 하는 모듈 찾아야함 

// rpm 파일 압축 해제하여 wgt 파일 찾기
// rpm 압축 해제 -> .tar 압축 해제 -> wgt 찾기 -> 복사 후 wgt 폴더로 이동

const unzip = require('unzip')
const fs = require('fs')
var tar = require('tar-fs')
const {gzip, ungzip} = require('node-gzip');
const StringDecoder = require('string_decoder').StringDecoder;
// unzip.unZipArray('./rpm/oaf_1.4.18.SSDG01R2_aarch64.rpm','./rpm/')

// var event = fs.createReadStream('./rpm/oaf_1.4.18.SSDG01R2_aarch64').pipe(unzip.Extract({ path: './rpm/' }))
// console.log(event)

// const rpmExtract = require('extract-zip')
 
// rpmExtract('/rpm/oaf_1.4.18.SSDG01R2_aarch64.rpm', {dir: '/rpm/'}, function (err){
//     console.log(err)
// })
var inputPath = './rpm/webapps.tar.gz'
// var outputPath = fs.mkdirSync('./rpm/appggdf')
var outputPath  = './tar/'
// var event = fs.createReadStream(inputPath).pipe(tar.extract(outputPath));

// event.on('error',function (err) {
//     console.log(err)
// })
// var gzipFile = fs.createReadStream(inputPath)
// var decoder = new StringDecoder('utf8');

// gzip(gzipFile)
//   .then((decompressed) => {
//       console.log(decompressed)
// //      var buffered = decompressed.toString()
//     console.log(decompressed.toString());     //Hello World

// })

 
const targz = require('targz');
const files = require('./lib/fies')


// compress files into tar.gz archive
// targz.decompress({
//     src: inputPath,
//     dest: outputPath
// }, function(err){
//     if(err) {
//         console.log(err);
//     } else {
//         console.log("Done!");
//     }
// });

var files_ = files.getFiles('./rpm/')
// wgt 파일이 반환 됨
// var wgtFiles = files.findType('wgt',files_)
var webappsPath = files.findType('gz',files_)
console.log(webappsPath)

const fileUrl = new URL('file://'+'D://wgt-version/wgt');
deleteAll('D://wgt-version/wgt/')
// var emptyFile = fs.readdirSync('D://wgt-version/wgt/')

// while(emptyFile.length > 0){
//     // deleteAll('D://wgt-version/wgt/')
//     emptyFile = fs.readdirSync('D://wgt-version/wgt/')
//     console.log('length :: ' + emptyFile.length)
// }



function deleteAll (url) {
fs.readdir(url, function (err, files){
    // console.log(url + '  file 목록 ....' + files)
 
    files.forEach((file) => {
        var curPath = url + '/' + file
        if(!isDirectory(url,file)){
            console.log('파일 지우기..................')
            fs.unlinkSync(curPath)
            console.log('deleted files....' + curPath)
            // console.log('디렉토리 지우기.....' + url)
            // fs.rmdirSync(url)
            fs.rmdir(url, function (err){
                if(err){
                    console.log('빈 파일이 아닙니다.. ')
                }else{
                    console.log('deleted directory........' + url)
                }
            })
        }else{
            console.log('디렉토리 입니다.. ' + curPath)
            fs.rmdir(curPath, function (err){
                if(err){
                    console.log('빈 파일이 아닙니다.. 재탐색..')
                    deleteAll(curPath)
                }else{
                    console.log('deleted directory........' + curPath)
                }
            })
        }
    })
})
}
// fs.rmdirSync(outputPath)
console.log('gggggggggg')
console.log(webappsPath[0])
targz.decompress({
    src: webappsPath[0],
    dest: outputPath
}, function(err){
    if(err) {
        console.log(err);
    } else {
        console.log('tar.gz 파일 압축이 해제되었습니다..')
        console.log("Done!" + outputPath);
        // outputpath 에서 wgt 파일 찾기
        var paths = files.getFiles(outputPath)
        var wgts = files.findType('wgt',paths)
        console.log(wgts)
        wgts.forEach((wgt)=> {
            fs.rename(wgt,'./wgt/' + wgt.substring(wgt.lastIndexOf('/')),function(err){
                if(err){
                    console.log(err)
                }else{
                    console.log('경로 이동..')

                    const { getVer } = require('./version.js')
                }
            })
        })
    }
})



function isDirectory (path, dirName) {
    var fullPath = path + '/' + dirName
    var flag = fs.lstatSync(fullPath).isDirectory()

    return flag
}