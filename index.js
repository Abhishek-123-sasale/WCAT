#!/usr/bin/env node

const fs = require("fs");
let arguments = process.argv.slice(2);

let flags = [];                 
let filenames = [];
let secondaryArguments = [];

for(let i of arguments){

    if(i[0] == "-"){
        flags.push(i);
    }else if(i[0] == "%")
          {
             secondaryArguments.push(i.slice(1));
          }else{
         filenames.push(i);
    }

}

// if(flags.length == 0  &&  filenames.length != 0){          

//     for(let files of filenames){                      
//         console.log(fs.readFileSync(files, "utf-8"));
//     }

// }
// else{   

//     for(let flag of flags){
//         if(flag == "-rs"){               //-rs -> Space
        
//             for(let file of filenames){

//                 let fileData  =  fs.readFileSync(file, "utf-8");
//                 let fileDataArray = fileData.split(" ").join("");

//                 console.log(fileDataArray);
//             }
        
//         }
//     }

// }

for(let file of filenames)
{
    let fileData = fs.readFileSync(file,"utf-8");
    for(let flag of flags)
    {
        if(flag == "-rs")
        {
            fileData = removeAll(fileData," ");
            
        }
        if(flag == "-rn")
        {
            fileData = removeAll(fileData,"\r\n");
        }
        if(flag == "-rsc")
        {
            for(let secondaryArgument of secondaryArguments)
            {
                fileData = removeAll(fileData,secondaryArgument);
            }
        }
        if(flag == "-s") 
        {
             fileData = addSequence(fileData);
             //console.log(data);
        }
        if(flag == "-sn") 
        {
            fileData = addSequenceTnel(fileData);
        } 
        if(flag == "-rel")
        {
            let ans = removeExtraLine(fileData);
            for(let i=0 ; i<ans.length ; i++)
            {
                console.log(ans[i]);
            }
        }  
    }
    console.log(fileData);
}

function removeAll(string,removalData)
{
    return string.split(removalData).join("");
}

function addSequence(content)
{
    let contentArr = content.split("\r\n");
    for(let i=0 ; i<contentArr.length ; i++)
    {
        contentArr[i] = [i+1] + ") " + contentArr[i] + "\n";
    }
    contentArr = contentArr.join("");
    return contentArr;
}

function addSequenceTnel(content)
{
    let contentArr = content.split("\r\n");
    let count = 1;
    for(let i=0 ; i<contentArr.length ; i++)
    {
        if(contentArr[i]!="")
        {
           contentArr[i] = count + ") " + contentArr[i] + "\n";
           count++;
        }
        else
        {
            contentArr[i] = "\r\n";
        }
    }
    contentArr = contentArr.join("");
    return contentArr;
}

function removeExtraLine(fileData)
{
    let contentArr = fileData.split("\r\n");
    let data = [];
    for(let i=0 ; i<contentArr.length ; i++)
    {
        if(contentArr[i] != "")
        {
            data.push(contentArr[i]);
        }
    }
    return data;
}