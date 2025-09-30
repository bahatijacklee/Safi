import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Wallet } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface WithdrawModalProps {
  isOpen: boolean;
  onClose: () => void;
  availableBalance: number;
}

export default function WithdrawModal({ isOpen, onClose, availableBalance }: WithdrawModalProps) {
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState('bank');
  const { toast } = useToast();

  const minWithdrawal = 10;
  const processingFee = 0;

  const handlePercentage = (percent: number) => {
    const calculatedAmount = (availableBalance * percent / 100).toFixed(2);
    setAmount(calculatedAmount);
  };

  const handleSubmit = () => {
    const withdrawAmount = parseFloat(amount);
    
    if (!amount || withdrawAmount <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid withdrawal amount",
        variant: "destructive"
      });
      return;
    }

    if (withdrawAmount < minWithdrawal) {
      toast({
        title: "Amount too low",
        description: `Minimum withdrawal amount is $${minWithdrawal}`,
        variant: "destructive"
      });
      return;
    }

    if (withdrawAmount > availableBalance) {
      toast({
        title: "Insufficient balance",
        description: "Withdrawal amount exceeds available balance",
        variant: "destructive"
      });
      return;
    }

    // TODO: Implement actual withdrawal logic
    toast({
      title: "Withdrawal requested",
      description: `Your withdrawal of $${withdrawAmount.toFixed(2)} has been submitted`,
    });
    
    setAmount('');
    onClose();
  };

  const finalAmount = amount ? parseFloat(amount) : 0;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Withdraw Funds</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Available Balance Info */}
          <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
            <div className="flex items-center gap-2 text-green-700 dark:text-green-400 mb-2">
              <Wallet className="h-5 w-5" />
              <span className="font-semibold">Available Balance: ${availableBalance.toFixed(2)}</span>
            </div>
            <p className="text-sm text-green-600 dark:text-green-500">
              Minimum withdrawal amount: ${minWithdrawal.toFixed(2)}
            </p>
          </div>

          {/* Withdrawal Amount */}
          <div>
            <Label htmlFor="amount" className="text-base font-semibold mb-2 block">
              Withdrawal Amount
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                $
              </span>
              <Input
                id="amount"
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="pl-7 h-12 text-lg"
                step="0.01"
                min="0"
                max={availableBalance}
              />
            </div>
            
            {/* Percentage Buttons */}
            <div className="flex gap-2 mt-3">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handlePercentage(25)}
                className="flex-1 text-green-600 dark:text-green-400"
              >
                25%
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handlePercentage(50)}
                className="flex-1 text-green-600 dark:text-green-400"
              >
                50%
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handlePercentage(100)}
                className="flex-1 text-green-600 dark:text-green-400"
              >
                Max
              </Button>
            </div>
          </div>

          {/* Withdrawal Method */}
          <div>
            <Label htmlFor="method" className="text-base font-semibold mb-2 block">
              Withdrawal Method
            </Label>
            <Select value={method} onValueChange={setMethod}>
              <SelectTrigger className="h-12">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bank">Bank Transfer (3-5 business days)</SelectItem>
                <SelectItem value="paypal">PayPal (1-2 business days)</SelectItem>
                <SelectItem value="crypto">Crypto Wallet (Instant)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Withdrawal Summary */}
          <div className="border rounded-lg p-4 space-y-2">
            <h3 className="font-semibold text-base mb-3">Withdrawal Summary</h3>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Amount:</span>
              <span className="font-medium">${finalAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Processing Fee:</span>
              <span className="font-medium text-green-600 dark:text-green-400">Free</span>
            </div>
            <div className="border-t pt-2 mt-2 flex justify-between">
              <span className="font-semibold">You'll receive:</span>
              <span className="font-bold text-green-600 dark:text-green-400 text-lg">
                ${finalAmount.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white"
            >
              Confirm Withdrawal
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
