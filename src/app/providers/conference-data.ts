import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { getDatabase, ref, child, get } from "firebase/database";
import { UserData } from './user-data';

@Injectable({
  providedIn: 'root'
})
export class ConferenceData {
  data: any;

  constructor(public http: HttpClient, public user: UserData) {

  }


  pullDataFromFirebase(): Observable<any> {
    console.log("pulling data from firebase..");
    const dbRef = ref(getDatabase());
    return new Observable<any>(observer => {
      get(child(dbRef, `/`)).then((snapshot) => {
        if (snapshot.exists()) {
          observer.next(snapshot.val());
        } else {
          console.log("No data available");
        }
        observer.complete();
      }).catch((error) => {
        observer.error(error);
      });
    });

  }

  load(): Observable<any> {
    if (this.data) {
      return of(this.data);
    } else {
      return this.pullDataFromFirebase().pipe(
        map(data => {
          this.data = this.processData(data);
          return this.data;
        })
      );
    }
  }
  processData(data: any) {

    this.data = data;
    this.data.projects.forEach((project: any) => {
      project.proposals.forEach((proposal: any) => {
        proposal.tutors = [];
        if (proposal.tutorName) {
          const tutor = this.data.tutors.find((t: any) => t.name == proposal.tutorName);
          if (tutor) {
            proposal.tutors.push(tutor);
            tutor.proposals = tutor.proposals || [];
            tutor.proposals.push(proposal);
          }
        }
      })
    })
    return this.data;
  }

  getTutors() {
    return this.load().pipe(

      map((data: any) => {
        console.log(data);
        return data.tutors.sort((a: any, b: any) => {
          const aName = a.name.split(' ').pop();
          const bName = b.name.split(' ').pop();
          return aName.localeCompare(bName);
        })
      })
    )
  }

  getTfgs() {
    console.log("GETTING TFGS");
    let proposals;
    return this.load().pipe(
      map((data) => {
        const projects = data.projects;
        projects.forEach((project) => {
          proposals = project.proposals;
        });
        return proposals;
      })
    )
  }

  filterSession(
    session: any,
    queryWords: string[],
    excludeTracks: any[],
    segment: string
  ) {
    let matchesQueryText = false;
    if (queryWords.length) {
      // of any query word is in the session name than it passes the query test
      queryWords.forEach((queryWord: string) => {
        if (session.name.toLowerCase().indexOf(queryWord) > -1) {
          matchesQueryText = true;
        }
      });
    } else {
      // if there are no query words then this session passes the query test
      matchesQueryText = true;
    }

    // if any of the sessions tracks are not in the
    // exclude tracks then this session passes the track test
    let matchesTracks = false;
    session.tracks.forEach((trackName: string) => {
      if (excludeTracks.indexOf(trackName) === -1) {
        matchesTracks = true;
      }
    });

    // if the segment is 'favorites', but session is not a user favorite
    // then this session does not pass the segment test
    let matchesSegment = false;
    if (segment === 'favorites') {
      if (this.user.hasFavorite(session.name)) {
        matchesSegment = true;
      }
    } else {
      matchesSegment = true;
    }

    // all tests must be true if it should not be hidden
    session.hide = !(matchesQueryText && matchesTracks && matchesSegment);
  }

  getSpeakers() {
    return this.load().pipe(
      map((data: any) => {
        return data.speakers.sort((a: any, b: any) => {
          const aName = a.name.split(' ').pop();
          const bName = b.name.split(' ').pop();
          return aName.localeCompare(bName);
        });
      })
    );
  }

  getTracks() {
    return this.load().pipe(
      map((data: any) => {
        return data.tracks.sort();
      })
    );
  }

  getMap() {
    return this.load().pipe(
      map((data: any) => {
        return data.map;
      })
    );
  }
}
