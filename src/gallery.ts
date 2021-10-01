import { IncomingMessage } from "http"
import { basename, dirname } from "path/posix"
import { GalleryResponse, ErrorMessage  } from "./interfaces"
import * as util from 'util';

// const fs = require('fs')
import * as fs from 'fs'
// const path = require('path')
import * as path from 'path'
// const querystring = require('querystring')
import * as querystring from 'querystring'

const readdir = util.promisify(fs.readdir);

enum folders {
    first_page = 1,
    second_page,
    third_page,
    fourth_page,
    fifth_page,
}


let photos: Array<string> = [];


export async function sendGalleryObject(pageNumber: any): Promise<GalleryResponse | ErrorMessage>{

    photos = [];
    if (isNaN(Number(pageNumber)) || Number(pageNumber) > 5 || Number(pageNumber) < 1) {
        console.log("Wrong page number")
        return {
            errorMessage: "Invalid page number"
        };
    }
    // let dir = '../static/photos/' + folders[pageNumber];
    let dir = path.join(__dirname, '../static/photos', folders[pageNumber])
    // console.log("Dir: " + dir)
    let files = await readdir(dir)

    files.forEach((file: any) => {
        photos.push(file)
    });

    // console.log("Photos: " + photos)

    let galleryResponse: GalleryResponse = {
        // objects: mappedArray(photos, pageNumber),
        objects: photos,
        page: pageNumber.toString(),
        total: 5
    }

    // console.log(galleryResponse)

    return galleryResponse;
}    

function mappedArray(arr: Array<string>, pageNumber: number): Array<string>{
    let newArr: Array<string> = []
    
    newArr = arr.map((img) => {
        let dir = path.join(__dirname, '../static/photos')
        // console.log(img)
        return path.join(dir, `${folders[pageNumber]}/`, img)
    })

    return newArr;
}