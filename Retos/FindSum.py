# backtrcking
def find_sum(numeros:list, target:int) -> list:
    def backtracking(start: int, target:int,  combi:list):
        # solución encontrada
        if target == 0:
            result.append(combi[:])
            return

        # no posee solución
        if target < 0 or start == len(numeros):
            return
        
        #backtrack búsqueda
        for index in range(start, len(numeros)):
            
            if index > start and numeros[index] == numeros[index - 1]:
                continue


            combi.append(numeros[index])
            backtracking(index + 1, target - numeros[index], combi)
        return
    
    result = []
    numeros.sort()
    backtracking(0, target, [])
    return result


print(find_sum([1, 5, 3, 2], 6))




# crea una funcion que encuentre  todas las combinaciones de los numeros de una lista que suman el valor del objetivo
# la funcion recibira una lista de numeros enteros positivos y un valor obj
# para obtene las combinaciones solo se puede usar una vez cada elemento de la lista
# [1, 5, , 3, 2] objt = 6
# 1,5 y 1,3,2