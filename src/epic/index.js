import { combineEpics, ofType} from 'redux-observable';
import { Observable , throwError  } from 'rxjs';
import { map, catchError, flatMap } from 'rxjs/operators';
import {ajax} from 'rxjs/ajax'

import {
    FETCH_WHISKIES,
    fetchWhiskiesFailure,
    fetchWhiskiesSuccess
} from '../actions'

const url = 'https://evening-citadel-85778.herokuapp.com/whiskey/' //the api for the whisky
/*
    The API returns the data in the following format:
    {
        "count": number,
        "next": "url to next page",
        "previous": "url to previous page",
        "results: array of whiskies
    }
    since we are only interested in the results array we will have to use map on our observable
 */

export const rootEpic = (action$)=>{ //action$ is a stream of actions
    //action$.ofType is the outer Observable
     return action$.pipe(
         ofType(FETCH_WHISKIES),
         flatMap(()=>ajax.getJSON(url)),
         map(data =>data.results),
         map(whiskies=>whiskies.map(whisky=>({
             id: whisky.id,
             title: whisky.title,
             imageUrl: whisky.img_url
         }))),
         map(whiskies=>whiskies.filter(whisky=>whisky.imageUrl)),
         map(whiskies=>fetchWhiskiesSuccess(whiskies)),
         catchError(error =>console.log(fetchWhiskiesFailure(error.message)))
     )
    
 }


/**
 * What we did here is import the action creators that we will need to dispatch as well as the action type that we will need to watch for in the action stream, and some operators from RxJS as well as the Observable. Note that neither RxJS nor Redux Observable import the operators automatically, therefore you have to import them by yourself (another option is to import the entire 'rxjs' module in your entry index.js, however I would not recommend this as it will give you large bundle sizes). Okay, let's go through these operators that we've imported and what they do:

map - similar to Javascript's native Array.map(), map executes a function over each item in the stream and returns a new stream/Observable with the mapped items.
of - creates an Observable/stream out of a non-Observable value (it can be a primitive, an object, a function, anything).
ajax - is the provided RxJS module for doing AJAX requests; we will use this to call the API.
catch - is used for catching any errors that may have occured
switchMap - is the most complicated of these. What it does is, it takes a function which returns an Observable, and every time this inner Observable emits a value, it merges that value to the outer Observable (the one upon which switchMap is called). Here's the catch tho, every time a new inner Observable is created, the outer Observable subscribes to it (i.e listens for values and merges them to itself), and cancels all other subscriptions to the previously emitted Observables. This is useful for situations where we don't care whether the previous results have succeeded or have been cancelled. For example, when we dispatch multiple actions for fetching the whiskies we only want the latest result, switchMap does exactly that, it will subscribe to the latest result and merge it to the outer Observable and discard the previous requests if they still haven't completed. When creating POST requests you usually care about whether the previous request has completed or not, and that's when mergeMap is used. mergeMap does the same except it doesn't unsubscribe from the previous Observables.
 */