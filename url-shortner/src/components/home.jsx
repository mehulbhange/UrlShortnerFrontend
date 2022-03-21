import axios from "axios";
import React, { useEffect, useState } from "react";
import shortUrlService from "../services/shortUrlService";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";


const Home=(props)=>{
    const [longUrl, setLongUrl] = useState({longUrl:"",});
    const [url, setUrl] = useState({},);
    const [isCopied, setIsCopied] = useState(false);


    useEffect(
        (event) =>{
            console.log("useEffect called!!!")
            console.log(url) 
            
        }
    )

    async function copyTextToClipboard(text) {
        if ('clipboard' in navigator) {
          return await navigator.clipboard.writeText(text);
        } else {
          return document.execCommand('copy', true, text);
        }
    }

    const handleCopyClick = () => {
        // Asynchronously call copyTextToClipboard
        copyTextToClipboard("http:localhost:8081/"+url.shortUrl)
        .then(() => {
        // If successful, update the isCopied state value
        setIsCopied(true);
        setTimeout(() => {
            setIsCopied(false);
        }, 15000);
        })
        .catch((err) => {
        console.log(err);
        });
    }

    const handleClick = (event) => {
        //alert(longUrl)
        console.log("Long url : "+ longUrl.longUrl.startsWith("http"))
        if(longUrl.longUrl.startsWith("http") == false){
            alert("Enter valid long url!!!")
        }else{
            shortUrlService.addUrl(longUrl).then(
                res => { 
                    console.log(res.data)
                    console.log(setUrl(res.data));
                    //console.log(url)
                    //console.log(url.shortUrl)
                }
            )
        }
        
    }



    return(
        <div>
            <h2>Welcome to UrlShortner</h2>

            <h4>Enter long url </h4>
            
            <TextField id="outlined-basic" label="Long URL" variant="outlined" id="long" name="longurl" onInput={e => setLongUrl({longUrl:e.target.value})} required /> <br /><br />
    
            <Button onClick={handleClick} variant="outlined">Generate</Button> <br /><br />

            
            <TextField id="outlined-basic"  variant="outlined" id="short" name="shorturl" value={(url.shortUrl != undefined)?"http:localhost:8081/"+url.shortUrl:"http:localhost:8081/"} InputProps={{ readOnly: true,}}  onClick={handleCopyClick}/> <br /> <br />

            <Button variant="outlined" onClick={handleCopyClick}>{isCopied?"Copied":"Copy"}</Button>
            
            
               
            
        </div>
            
        
        
    );
}

export default Home;
