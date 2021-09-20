import { ReplaySubject } from 'rxjs';
const subject = new ReplaySubject(3); // wiederholt 3 Werte
 
// Alle werden ausgegeben
subject.subscribe({
  next: (v) => console.log(`Observer A: ${v}`)
});
 
subject.next(1); // geht verloren
subject.next(2); // merken
subject.next(3); // merken
subject.next(4); // merken 
 
 // gemerkte werden ausgegeben
subject.subscribe({
  next: (v) => console.log(`Observer B: ${v}`)
});
 
// beide Abonnenten geben aus
subject.next(5);