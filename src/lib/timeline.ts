import type {CollectionEntry} from 'astro:content';
import {datePrecision} from '../schemas/dates';
import {path} from './paths';
export function achievementTimeline(songs:CollectionEntry<'songs'>[]) {
  const entries:CollectionEntry<'history'>[]=[];const links:Record<string,string>={};
  for(const song of songs) song.data.achievements.forEach((a,index)=>{
    const id=`record-${song.id}-${index}`;
    entries.push({id,collection:'history',data:{id,title:`${song.data.titleJa} · ${a.title}`,type:a.type,date:a.date,year:Number(a.date.slice(0,4)),datePrecision:datePrecision(a.date),location:null,venue:null,description:a.description,sources:[a.source],verified:true,verifiedAt:song.data.updatedAt,status:'documented',dateBasis:a.dateBasis,verificationScope:a.source.scope,conflictNotes:[],showIds:[],setlistIds:[]}});
    links[id]=path(`songs/${song.id}/`)+'#achievements';
  });
  return {entries,links};
}
