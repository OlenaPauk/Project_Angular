import { PipeTransform,Pipe } from '@angular/core';
import { IMasters } from '../shared/interfaces/masters.interface';


@Pipe({
    name: 'masterFilter'
})
export class MasterFilterPipe implements PipeTransform {
    transform(masters: IMasters[], searchTerm: string): IMasters[] {
        if (!masters || !searchTerm) {
            return masters;
        }

        return masters.filter(master =>
            master.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);
    }
}