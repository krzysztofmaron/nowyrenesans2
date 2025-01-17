from django.db import models

# Create your models here.
class PaidMember(models.Model):
    email = models.EmailField()
    renewal_date = models.DateField()
    canceled = models.BooleanField(default=False)
    failed_payment = models.BooleanField(default=False)

    def __str__(self):
        return str(self.email) + ' | ' + str(self.renewal_date) + ' | ' + str(self.canceled)
    
    
class GlobalPrices(models.Model):
    one_month_price = models.IntegerField(default=0)
    three_month_price = models.IntegerField(default=0)
    twelve_month_price = models.IntegerField(default=0)

    def __str__(self):
        return "Global Pricing Configuration"