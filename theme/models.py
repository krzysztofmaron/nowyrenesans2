from django.db import models

# Create your models here.
class PaidMember(models.Model):
    email = models.EmailField()
    renewal_date = models.DateField()
    canceled = models.BooleanField(default=False)
    failed_payment = models.BooleanField(default=False)

    def __str__(self):
        return str(self.email) + ' | ' + str(self.renewal_date) + ' | ' + str(self.canceled)