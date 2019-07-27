
début = int(input())
fin = int(input())
nbEntrées = int(input())
nbespion=0
for i in range(nbEntrées):
    pos=int(input())
    if (pos<=fin and pos>=début):
        nbespion+=1
       

print(nbespion)       



