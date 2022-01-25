import { Injectable } from "@angular/core";
import {BehaviorSubject, of, Subject} from "rxjs";

@Injectable({
  providedIn: "root"
})
export class CloudService {


  files: any = [
    // tslint:disable-next-line: max-line-length
    {
      url:
        "https://test242425.s3.us-east-1.amazonaws.com/10-shinedown-breaking_inside_%28zvukoff.ru%29.mp3?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGkaDGV1LWNlbnRyYWwtMSJIMEYCIQC%2Bq1ivSujsBLZ98qwSd5qWj7TknDbXSy0Sg8fIQKa9PQIhALvVcsXRFTlhD2QtSz%2BBMaCJnGis0GsVTqlNxHksUHbyKu0CCJL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMMzIwNDc4MjQzNjEyIgzjiH6%2BidlwOOmaOgcqwQIsKSdeIhe%2FSzGJ1ssBNwf0fH%2F5BtArkCbE187wD3I7zvvAyeRJTWzzKLWPCn7UYKW%2BB9nl9%2FKZu0jLE7jgIB0zSpsnZHBQ1Z8o9fCp9GYfggIzB7wh%2F%2F5W47c%2BkUvvlvNCsubzpXo1ZdmE4HrJtIe4D6uQkFmXdAd%2Bo2eVDAUynLEHPmqxCY6lMz0jyHObAEZo7%2BheO4wbe8Wkl52r%2FlrHLF081rz9YtqQzay%2B%2BEwIIds8IAcGmGdIibqY1S1Ud1pA76lFfCjeJoYwe2M71xr1z5fYkL%2FQiv6xyhczAkAsgBjhTEOyXem5jnYfCH6tSrneIzyqqhQG5DPtdJS2XCHz53ERQkHfQ6cKWPj49XO2KHLZhsTK3Z83rDO5D%2BpirI4VR2IGxAMc%2F6jrlwLvjYn8LauDZAppQbGEn8y8FtjKpREw18rAjwY6sgLtNOstuU5%2FHn%2Bhk%2BXzYGyBUedRe9AFO3z401IhMaGt1MEGT6AYsCLthTb1Qg%2FP0v6NlED%2BUOa1384PCin8WBJppG3qRsSRI2sUZ4%2BWSGw89fKJ88XxwpB%2FURB0%2B4tHBSUV%2FojkCRNq9Xrmi%2FQZyihKwdlyAnWlKMEa4JuB9E%2BIWCrLfzu2NClnG8Jls0fFk%2FNfHSdS2FBW2L5XcZBo9qhz7VCjxIbYeGm0IvO2GOxvm33baoYJz1lTL6j9Ubw71%2F1zCrK1Y4Qbsqg7IAt1Mdt%2B0Pekc9r%2BfBsMRK0JreO0QjqaQRzYrgnq9meHS5rkFGDWOHASvJlUBtwh4lDu2zXl3JlW50%2B00nSfQVG846ZAGN2ug29I1eYJNoqpSFX%2FZmZSY5ep6DZcxkfzCK%2BBF6uQzKQ%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20220125T172614Z&X-Amz-SignedHeaders=host&X-Amz-Expires=604800&X-Amz-Credential=ASIAUVHP55MOINMJHFBS%2F20220125%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=4e2242780dba5d07eda766b40aa953726fd48ca21d6ce4220cd360d8c73d9eb6",
      name: "Perfect",
      artist: " Ed Sheeran"
    },
    {
      // tslint:disable-next-line: max-line-length
      url:
        "https://ia801609.us.archive.org/16/items/nusratcollection_20170414_0953/Man%20Atkiya%20Beparwah%20De%20Naal%20Nusrat%20Fateh%20Ali%20Khan.mp3",
      name: "Man Atkeya Beparwah",
      artist: "Nusrat Fateh Ali Khan"
    },
    {
      url:
        "https://ia801504.us.archive.org/3/items/EdSheeranPerfectOfficialMusicVideoListenVid.com/Ed_Sheeran_-_Perfect_Official_Music_Video%5BListenVid.com%5D.mp3",
      name: "Perfect",
      artist: " Ed Sheeran"
    },
    {
      // tslint:disable-next-line: max-line-length
      url:
        "https://ia801609.us.archive.org/16/items/nusratcollection_20170414_0953/Man%20Atkiya%20Beparwah%20De%20Naal%20Nusrat%20Fateh%20Ali%20Khan.mp3",
      name: "Man Atkeya Beparwah",
      artist: "Nusrat Fateh Ali Khan"
    },
    {
      url:
        "https://ia801504.us.archive.org/3/items/EdSheeranPerfectOfficialMusicVideoListenVid.com/Ed_Sheeran_-_Perfect_Official_Music_Video%5BListenVid.com%5D.mp3",
      name: "Perfect",
      artist: " Ed Sheeran"
    },
    {
      // tslint:disable-next-line: max-line-length
      url:
        "https://ia801609.us.archive.org/16/items/nusratcollection_20170414_0953/Man%20Atkiya%20Beparwah%20De%20Naal%20Nusrat%20Fateh%20Ali%20Khan.mp3",
      name: "Man Atkeya Beparwah",
      artist: "Nusrat Fateh Ali Khan"
    },
    {
      url:
        "https://ia801504.us.archive.org/3/items/EdSheeranPerfectOfficialMusicVideoListenVid.com/Ed_Sheeran_-_Perfect_Official_Music_Video%5BListenVid.com%5D.mp3",
      name: "Perfect",
      artist: " Ed Sheeran"
    },
    {
      // tslint:disable-next-line: max-line-length
      url:
        "https://ia801609.us.archive.org/16/items/nusratcollection_20170414_0953/Man%20Atkiya%20Beparwah%20De%20Naal%20Nusrat%20Fateh%20Ali%20Khan.mp3",
      name: "Man Atkeya Beparwah",
      artist: "Nusrat Fateh Ali Khan"
    },
    {
      url:
        "https://ia801504.us.archive.org/3/items/EdSheeranPerfectOfficialMusicVideoListenVid.com/Ed_Sheeran_-_Perfect_Official_Music_Video%5BListenVid.com%5D.mp3",
      name: "Perfect",
      artist: " Ed Sheeran"
    },
    {
      // tslint:disable-next-line: max-line-length
      url:
        "https://ia801609.us.archive.org/16/items/nusratcollection_20170414_0953/Man%20Atkiya%20Beparwah%20De%20Naal%20Nusrat%20Fateh%20Ali%20Khan.mp3",
      name: "Man Atkeya Beparwah",
      artist: "Nusrat Fateh Ali Khan"
    },
    {
      url:
        "https://ia801504.us.archive.org/3/items/EdSheeranPerfectOfficialMusicVideoListenVid.com/Ed_Sheeran_-_Perfect_Official_Music_Video%5BListenVid.com%5D.mp3",
      name: "Perfect",
      artist: " Ed Sheeran"
    },
    {
      // tslint:disable-next-line: max-line-length
      url:
        "https://ia801609.us.archive.org/16/items/nusratcollection_20170414_0953/Man%20Atkiya%20Beparwah%20De%20Naal%20Nusrat%20Fateh%20Ali%20Khan.mp3",
      name: "Man Atkeya Beparwah",
      artist: "Nusrat Fateh Ali Khan"
    },
  ];

  currentFile = new BehaviorSubject(null);


  getFiles() {
    return of(this.files);
  }
}
