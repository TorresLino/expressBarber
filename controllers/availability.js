class Availability{
    static unavailableBarbers = (i, allSlots, bookedSlots, size) => {
        i = parseInt(i)
        var unavailableBarbers = []
        for(var j=0; j<size; j++){
            if(i + j > allSlots.lenght)
                return true
            for(var s in bookedSlots){
                var slot = bookedSlots[s]
                if(slot.timeSlotID == allSlots[i+j] && !unavailableBarbers.includes(slot.barberID))
                    unavailableBarbers.push(slot.barberID)
            }
        }
        return unavailableBarbers;
    }
    
    static unavailableDate = (i, allSlots, bookedSlots, size, barbers) => {
        var ub = this.unavailableBarbers(i, allSlots, bookedSlots, size);
        for(var b in barbers){
            if(!ub.includes(barbers[b]))
                return false;
        }
        return true;
    }
}

export default Availability;