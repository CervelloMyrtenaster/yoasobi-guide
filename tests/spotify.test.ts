import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { songSchema } from '../src/schemas/content';
import evidence from '../research/spotify-links.json';

test('every song has its own verified Spotify track and provenance',()=>{
  const files=fs.readdirSync('src/content/songs').filter(file=>file.endsWith('.md'));
  assert.equal(evidence.length,files.length);
  assert.equal(new Set(evidence.map(entry=>entry.songId)).size,files.length);
  const urls=new Set<string>();
  for(const file of files){
    const text=fs.readFileSync('src/content/songs/'+file,'utf8');
    const song=songSchema.parse(JSON.parse(text.match(/^---\r?\n([\s\S]*?)\r?\n---/)![1]));
    assert.ok(song.spotify);
    const proof=evidence.find(entry=>entry.songId===file.slice(0,-3));
    assert.equal(proof?.url,song.spotify.url);
    assert.equal(proof?.verifiedAt,song.spotify.verifiedAt);
    assert.ok(proof?.artists.includes('YOASOBI'));
    assert.ok(!urls.has(song.spotify.url),'Separate versions must not share a Spotify track');
    urls.add(song.spotify.url);
  }
});
test('Spotify schema rejects search, embed, non-HTTPS and arbitrary-host URLs',()=>{
  const schema=songSchema.shape.spotify;
  for(const url of ['http://open.spotify.com/track/1hAloWiinXLPQUJxrJReb1','https://spotify.example/track/1hAloWiinXLPQUJxrJReb1','https://open.spotify.com/search/idol','https://open.spotify.com/embed/track/1hAloWiinXLPQUJxrJReb1','https://open.spotify.com/track/invalid'])assert.equal(schema.safeParse({url,verifiedAt:'2026-10-06'}).success,false);
});
