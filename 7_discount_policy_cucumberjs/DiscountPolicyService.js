class DiscountPolicyService {

    calcDiscountedPrice(listPrice, hasDiscountCard, hasStudentCard) {
        if (hasDiscountCard) {
            if (hasStudentCard) return listPrice * 0.85;
            else return listPrice * 0.90;
        } else {
            if (hasStudentCard) return listPrice * 0.88;
            else return listPrice;
        }
    }
}

module.exports = DiscountPolicyService;